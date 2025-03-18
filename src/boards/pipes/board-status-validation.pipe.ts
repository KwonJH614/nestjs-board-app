import { ArgumentMetadata, BadRequestException, ConsoleLogger, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board-status.enum";

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [
    BoardStatus.PRIVATE,
    BoardStatus.PUBLIC
  ]

  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1
  }

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the status options`)
    }

    return value;
  }

}