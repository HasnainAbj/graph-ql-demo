import { Injectable } from '@nestjs/common';
import { PaginationInterface } from '../interfaces/pagination';
import { createHash } from 'crypto';

interface PaginationOffset {
  limit: number;
  offset: number;
  pageNumber: number;
}
@Injectable()
export class Helper {
  public getPaginateOffset(
    currentPage: number,
    recordPerPage: number,
  ): PaginationOffset {
    const pageNumber = currentPage ? Number(currentPage) : 1;
    const limit = recordPerPage ? Number(recordPerPage) : 10;
    const offset = (currentPage - 1) * limit;
    return { limit, offset, pageNumber };
  }

  public createPagination<T>(
    totalRecord: number,
    pageNumber: number,
    recordPerPage: number,
    data: T[],
  ): PaginationInterface<T[]> {
    let remainingCount =
      totalRecord - ((pageNumber - 1) * recordPerPage + data.length);
    remainingCount = remainingCount >= 0 ? remainingCount : 0;
    const result: PaginationInterface<T[]> = {
      total: totalRecord,
      recordPerPage,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalRecord / recordPerPage),
      nextPage: remainingCount ? pageNumber + 1 : null,
      remainingCount,
      data,
    };

    return result;
  }

  public createHashId(uuid1: string, uuid2: string) {
    const combinedUuids = [uuid1, uuid2].sort().join('');
    return createHash('md5').update(combinedUuids).digest('hex');
  }
}
