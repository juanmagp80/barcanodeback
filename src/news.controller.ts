import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
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

    async delete(@Param('id') id: string): Promise<boolean> {
        const result = await this.newsService.delete(+id);
        return result;
    }

    @Delete()
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteAll(): Promise<void> {
        const result = await this.newsService.deleteAll();
        if (!result) {
            throw new HttpException('Error al eliminar todas las noticias', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
