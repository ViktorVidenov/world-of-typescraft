import { Component, ElementRef, ViewChild } from '@angular/core';
import { Resource } from 'src/classes/Resource';
import { Unit } from 'src/classes/Unit';
import { WorldObject } from 'src/classes/WorldObject';
import { Point, ResourcesType, Team, UnitType } from 'src/models/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

// create unit Marto 10,10 Blue Guard 
// create resource Lumber 0,1 30  

export class AppComponent {
  public outputMessages: string[] = [];
  public worldObjects: WorldObject[] = [];
  public names: string[] = [];
  public cordinates: object[] = [];
  public isFindedEqualCordinates: boolean = false

  @ViewChild('inputArea') inputArea: ElementRef;

  constructor() { }

  executeCommand() {
    const commands = this.inputArea.nativeElement.value.split(' ');

    const command = commands[0];
    switch (command) {
      case 'create':
        this.createWorldObject(commands);
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

        if (this.names.includes(name)) {
          this.outputMessages.push('Unit with this name already exists!');
          break;
        }

        if (!Object.values(Team).includes(team)) {
          this.outputMessages.push(`Team ${team.toLowerCase()} does not exist!`);
          break;
        }

        if (!Object.values(UnitType).includes(type)) {
          this.outputMessages.push(`Unit type ${type.toLowerCase()} does not exist!`);
          break;
        }

        if (name.length >= 20) {
          this.outputMessages.push('Unit name too long!');
          break;
        }

        const unit = new Unit(cordinates, team, name, type);
        this.worldObjects.push(unit);
        this.names.push(name);

        this.outputMessages.push(
          `Created ${type.toString().toLowerCase()} from ${team.toString().toLowerCase()} team named ${name} at position ${this.getStringByCoordinates(cordinates)}`
        )
        break;

      case 'resource':
        const resourceType: ResourcesType = commands[2].toUpperCase() as ResourcesType;
        const resourceCordinates: Point = this.getCordinatesByString(commands[3]);
        const healthPoints: number = Number(commands[4]);

        const resource = new Resource(resourceType, resourceCordinates, healthPoints)

        this.compareCordinates(this.cordinates, resourceCordinates)

        if (resourceType !== ResourcesType.FOOD && resourceType !== ResourcesType.IRON && resourceType !== ResourcesType.LUMBER) {
          this.outputMessages.push(
            `Resource type ${resource.resourceType.toLowerCase().toString()} does not exist!`
          )
          break;
        }

        if (this.isFindedEqualCordinates) {
          
          console.log(this.cordinates, 'in if-a');
          this.isFindedEqualCordinates = false;
          break;
        }

        if (healthPoints < 1) {
          this.outputMessages.push(`Please provide valid quantity!`)
          break;
        }

        this.cordinates.push(resourceCordinates);
        console.log(this.cordinates);
        this.outputMessages.push(
          `Created ${resourceType.toString().toLowerCase()} at position ${this.getStringByCoordinates(resourceCordinates)} with ${healthPoints} health`
        );

        break;

      default:
        break;
    }
  }

  private getCordinatesByString(cordinates: string): Point {
    const [x, y] = cordinates.split(',').map(Number);
    return { x, y }
  }

  private getStringByCoordinates(coordinates: Point): string {
    return `${coordinates.x}, ${coordinates.y}`
  }

  private compareCordinates(cordinates: object[], currentCordinate: object) {
    cordinates.forEach((row) => {
      if (JSON.stringify(row) === JSON.stringify(currentCordinate)) {
        this.outputMessages.push(`There is already a resource at this position, please try a different position.`)
        this.isFindedEqualCordinates = true;
      }
    })
  }

}
