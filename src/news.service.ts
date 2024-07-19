import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './news.entity';

@Injectable()
export class NewsService {
    constructor(
        @InjectRepository(News)
        private readonly newsRepository: Repository<News>,
    ) { }
    private news: News[] = [];
    private idCounter = 1;

    findAll(): News[] {
        return this.news;
    }

    findOne(id: number): News {
        return this.news.find(news => news.id === id);
    }

    create(news: Omit<News, 'id'>): News {
        const newNews = { ...news, id: this.idCounter++ };
        this.news.push(newNews);
        return newNews;
    }

    update(id: number, news: Omit<News, 'id'>): News {
        const index = this.news.findIndex(n => n.id === id);
        if (index !== -1) {
            this.news[index] = { ...news, id };
            return this.news[index];
        }
        return null;
    }

    async deleteAll(): Promise<boolean> {
        try {
            await this.newsRepository.clear();
            return true;
        } catch (error) {
            console.error('Error al eliminar todas las noticias', error);
            return false;
        }
    }


}
