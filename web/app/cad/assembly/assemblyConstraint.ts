import {CoreContext} from "context";
import {ConstantsDefinitions} from "../../sketcher/constr/ANConstraints";
import {IconType} from "react-icons";
import {MObject} from "../model/mobject";
import {AssemblyDOF} from "./dof/assemblyDOF";

export interface AssemblyConstraintDefinition {

  typeId: string;

  objects: string[];

  constants: ConstantsDefinitions

}

export interface AssemblyConstraintSchema {

  id: string,
  name: string,
  icon?: IconType,

  selectionMatcher?: {
    selector: string,
    types: any[],
    minQuantity: number
  };

  implementation: { new(schema: AssemblyConstraintSchema, fixedPart: MObject, movingPart: MObject, objects: MObject[]): AssemblyConstraint };
}

export abstract class AssemblyConstraint {

  schema: AssemblyConstraintSchema;

  fixedPart: MObject;
  movingPart: MObject;

  objects: MObject[];

  constants: ConstantsDefinitions = {};

  protected constructor(schema: AssemblyConstraintSchema, fixedPart: MObject, movingPart: MObject, objects: MObject[]) {
    this.schema = schema;
    this.fixedPart = fixedPart;
    this.movingPart = movingPart;
    this.objects = objects;
  }

  abstract apply(dof: AssemblyDOF);


  write(): AssemblyConstraintDefinition {
    return {
      typeId: this.schema.id,

      objects: this.objects.map(o => o.id),

      constants: this.constants
    }
  }

}


