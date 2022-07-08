import { Component, ElementRef, ViewChild } from '@angular/core';
import { Resource } from 'src/classes/Resource';
import { Unit } from 'src/classes/Unit';
import { WorldObject } from 'src/classes/WorldObject';
import { Point, Team } from 'src/models/WorldObjectModel';
import { ResourcesType } from 'src/models/ResourseModel';
import { UnitType } from 'src/models/UnitModel';
import { validatePosition, validateUnit } from 'src/helper/validation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public outputMessages: string[] = [];
  public worldObjects: WorldObject[] = [];
  public names: string[] = [];
  public cordinates: object[] = [];
  public isFindedEqualCordinates: boolean = false;

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

  public createWorldObject(commands: string[]) {
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

        if (healthPoints < 1 || isNaN(healthPoints)) {
          this.outputMessages.push(`Please provide valid quantity!`);
          break;
        }

        if (
          resourceType !== ResourcesType.FOOD &&
          resourceType !== ResourcesType.IRON &&
          resourceType !== ResourcesType.LUMBER
        ) {
          this.outputMessages.push(
            `Resource type ${resourceType} does not exist!`
          );
          break;
        }

        this.compareCordinates(this.cordinates, resourceCordinates);

        if (validatePosition(resourceCordinates)) {
          this.outputMessages.push('Invalid Cordinates!');
          break;
        }

        if (this.isFindedEqualCordinates) {
          this.isFindedEqualCordinates = false;
          break;
        }

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
        break;

      default:
        break;
    }
  }

  public orderUnit(commands: string) {
    const name: string = commands[1];
    switch (commands[2]) {
      case 'attack':
        this.worldObjects.forEach((unit) => {
          const attacker = this.worldObjects.find((unit) => unit.name === name);
          if (attacker instanceof Unit && unit instanceof Unit) {
            if (
              unit.position.x === attacker.position.x &&
              unit.position.y === attacker.position.y &&
              unit.team !== attacker.team &&
              !unit.isDestroyed
            ) {
              let attackerDamage = attacker.attack - unit.defense;
              let defenderDamage = unit.attack - attacker.defense;

              unit.modifyHealthPoints(attackerDamage);
              attacker.modifyHealthPoints(defenderDamage);

              this.outputMessages
                .push(`There was a fierce fight between ${unit.name} and ${attacker.name}.
               The defender took totally ${attackerDamage} damage. The attacker took ${defenderDamage} damage.`);
            } else if (
              unit.position.x === attacker.position.x &&
              unit.position.y === attacker.position.y &&
              attacker.team === unit.team &&
              attacker.name !== unit.name &&
              !unit.isDestroyed
            ) {
              this.outputMessages.push(
                `You cannot attack your friends, dummy!`
              );
            }
          }
        });
        break;
      case 'gather':
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

  private compareCordinates(cordinates: object[], currentCordinate: object) {
    cordinates.forEach((row) => {
      if (JSON.stringify(row) === JSON.stringify(currentCordinate)) {
        this.outputMessages.push(
          `There is already a resource at this position, please try a different position.`
        );
        this.isFindedEqualCordinates = true;
      }
    });
  }

  private moveUnit(
    position: Point,
    foundUnit: any,
    worldObjects: WorldObject[]
  ): void {
    worldObjects.forEach((player) => {
      if (foundUnit instanceof Unit) {
        Object.values(player).forEach((playerValues) => {
          if (playerValues === foundUnit.name) {
            player.modifyPosition(position);
            this.outputMessages.push(
              `Unit ${foundUnit.name} moved to ${position.x}, ${position.y}`
            );
          }
        });
      }
    });
  }
}
