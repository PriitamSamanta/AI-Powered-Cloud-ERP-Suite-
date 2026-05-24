import { Body, Controller, Get, Post } from '@nestjs/common';
import { JournalEntriesService } from '../services/journal-entries.service';
import { CreateJournalEntryDto } from '../dto/create-journal-entry.dto';

@Controller('finance/journal-entries')
export class JournalEntriesController {
  constructor(private readonly journalEntriesService: JournalEntriesService) {}

  @Post()
  create(@Body() dto: CreateJournalEntryDto) {
    return this.journalEntriesService.create(dto);
  }

  @Get()
  findAll() {
    return this.journalEntriesService.findAll();
  }
}