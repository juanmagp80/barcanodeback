import { Injectable } from '@nestjs/common';
import { News } from './news.entity';

@Injectable()
export class NewsService {
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

    delete(id: number): boolean {
        const index = this.news.findIndex(news => news.id === id);
        if (index !== -1) {
            this.news.splice(index, 1);
            return true;
        }
        return false;
    }
}
