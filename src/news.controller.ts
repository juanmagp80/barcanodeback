import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { News } from './news.entity';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) { }

    @Get()
    findAll(): News[] {
        return this.newsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): News {
        return this.newsService.findOne(+id);
    }

    @Post()
    create(@Body() news: Omit<News, 'id'>): News {
        return this.newsService.create(news);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() news: Omit<News, 'id'>): News {
        return this.newsService.update(+id, news);
    }

    @Delete(':id')
    delete(@Param('id') id: string): boolean {
        return this.newsService.delete(+id);
    }
}
