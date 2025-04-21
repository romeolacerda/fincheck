import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { validate as isUUID } from 'uuid';

@Injectable()
export class OptionalParseUUIDPipe implements PipeTransform {
  transform(value: string | undefined, metadata: ArgumentMetadata): string | undefined {
    if (!value) {
      return undefined;
    }

    if (!isUUID(value)) {
      throw new BadRequestException('Invalid UUID');
    }

    return value;
  }
}
