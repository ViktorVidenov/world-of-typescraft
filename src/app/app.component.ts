import { Component, ElementRef, ViewChild } from '@angular/core';
import { Resource } from 'src/classes/Resource';
import { Unit } from 'src/classes/Unit';
import { WorldObject } from 'src/classes/WorldObject';
import { Point, Team } from 'src/models/WorldObjectModel';
import { ResourcesType } from 'src/models/ResourseModel';
import { UnitType } from 'src/models/UnitModel';
import {
  validatePosition,
  validateUnit,
  validateResource,
} from 'src/helper/validation-helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public outputMessages: string[] = [];
  public worldObjects: WorldObject[] = [];
  public names: string[] = [];
  public cordinates: Point[] = [];

  @ViewChild('inputArea') inputArea: ElementRef;

  constructor() {}

  executeCommand() {
    const commands = this.inputArea.nativeElement.value.split(' ');

    const command = commands[0];
    switch (command) {
      case 'create':
        this.createWorldObject(commands);
        break;
      case 'order':
        this.orderUnit(commands);
        break;
      default:
        break;
    }
  }

  public createWorldObject(commands: string[]): void {
    switch (commands[1]) {
      case 'unit':
        const name: string = commands[2];
        const cordinates: Point = this.getCordinatesByString(commands[3]);
        const team: Team = commands[4].toUpperCase() as Team;
        const type: UnitType = commands[5].toUpperCase() as UnitType;
        const unitValidation = validateUnit(
          name,
          this.names,
          team,
          type,
          cordinates
        );

        if (!unitValidation) {
          const unit = new Unit(name, cordinates, team, type);
          this.worldObjects.push(unit);
          this.names.push(name);

          this.outputMessages.push(
            `Created ${type.toString().toLowerCase()} from ${team
              .toString()
              .toLowerCase()} team named ${name} at position ${this.getStringByCoordinates(
              cordinates
            )}`
          );
        } else {
          this.outputMessages.push(unitValidation);
        }
        break;

      case 'resource':
        const resourceType: ResourcesType =
          commands[2].toUpperCase() as ResourcesType;
        const resourceCordinates: Point = this.getCordinatesByString(
          commands[3]
        );
        const healthPoints: number = Number(commands[4]);
        const resourceValidation = validateResource(
          resourceType,
          healthPoints,
          resourceCordinates,
          this.cordinates
        );

        if (!resourceValidation) {
          const resource = new Resource(
            resourceType,
            resourceCordinates,
            healthPoints
          );
          this.cordinates.push(resourceCordinates);
          this.worldObjects.push(resource);

          this.outputMessages.push(
            `Created ${resourceType
              .toString()
              .toLowerCase()} at position ${this.getStringByCoordinates(
              resourceCordinates
            )} with ${healthPoints} health`
          );
        } else {
          this.outputMessages.push(resourceValidation);
        }
        break;

      default:
        break;
    }
  }

  public orderUnit(commands: string): void {
    const name: string = commands[1];
    let deadsUnit: object[] = [];
    let attackersTeam: WorldObject[] = [];
    let defendersTeam: WorldObject[] = [];

    switch (commands[2]) {
      case 'attack':
        let canAttackOnce: number = 0;
        const attacker = this.worldObjects.find((unit) => unit.name === name);

        this.worldObjects.forEach((wordObject) => {
          if (attacker instanceof Unit && wordObject instanceof Unit) {
            attacker.team === wordObject.team ? attackersTeam.push(wordObject) : defendersTeam.push(wordObject);

            if (
              wordObject.position.x === attacker.position.x &&
              wordObject.position.y === attacker.position.y &&
              wordObject.team !== attacker.team && 
              !wordObject.isDestroyed &&
              canAttackOnce === 0
            ) {
              canAttackOnce = 1;
              let attackerDamage = attacker.attack - wordObject.defense;
              let defenderDamage = wordObject.attack - attacker.defense;

              wordObject.modifyHealthPoints(attackerDamage);
              wordObject.modifyHealthPoints(attackerDamage);
              attacker.modifyHealthPoints(defenderDamage);

              if (wordObject.healthPoints === 0) {
                deadsUnit.push(wordObject);
              }
              this.outputMessages
                .push(`There was a fierce fight between ${wordObject.name} and ${attacker.name}.
               The defender took totally ${attackerDamage} damage. The attacker took ${defenderDamage} damage. There are ${deadsUnit.length} dead units after the fight was over`);
            } else if (
              wordObject.position.x === attacker.position.x &&
              wordObject.position.y === attacker.position.y &&
              attacker.team === wordObject.team &&
              attacker.name !== wordObject.name &&
              !wordObject.isDestroyed
            ) {
              this.outputMessages.push(
                `You cannot attack your friends, dummy!`
              );
            }
          }
        });

        break;
      case 'gather':
        const unit: WorldObject[] = [];

        this.worldObjects.forEach((worldObject) => {
          if (worldObject instanceof Unit) {
            if (
              name === worldObject.name ||
              worldObject.canGather === false ||
              worldObject.type == UnitType.GUARD ||
              worldObject.type == UnitType.NINJA
            ) {
              unit.push(worldObject);
            }
          }

          if (worldObject instanceof Resource) {
          }
        });
        break;

      case 'go':
        const position = this.getCordinatesByString(commands[3]);
        if (!this.names.includes(name)) {
          this.outputMessages.push('User not found!');
          break;
        }

        if (validatePosition(position)) {
          this.outputMessages.push('Please enter valid coordinates!');
          break;
        }

        const foundUnit = this.worldObjects.find((unit) => unit.name === name);

        this.moveUnit(position, foundUnit, this.worldObjects);

        break;

      default:
        break;
    }
  }

  private getCordinatesByString(cordinates: string): Point {
    const [x, y] = cordinates.split(',').map(Number);
    return { x, y };
  }

  private getStringByCoordinates(coordinates: Point): string {
    return `${coordinates.x}, ${coordinates.y}`;
  }

  private moveUnit(
    position: Point,
    foundUnit: any,
    worldObjects: WorldObject[]
  ): void {
    worldObjects.forEach((worldObject) => {
      if (foundUnit instanceof Unit) {
        Object.values(worldObject).forEach((playerValues) => {
          if (playerValues === foundUnit.name) {
            worldObject.modifyPosition(position);
            this.outputMessages.push(
              `Unit ${foundUnit.name} moved to ${position.x}, ${position.y}`
            );
          }
        });
      }
    });
  }
}
