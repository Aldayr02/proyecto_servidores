import { Request, Response } from 'express';

import { response_status } from '../utils/response_status';
import NovelModel from '../models/novels-model';


export class NovelsController {
  get_novel(req: Request, res: Response) {
    const data = {
      title: req.body.title,
      author: req.body.author,
    };

    NovelModel.findOne(data)
      .then((response) => {
        res.send(response);
      })
      .catch((e) => {
        res.send(e);
      });
  }

  create_novel(req: Request, res: Response) {
    const data = {
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      rank: req.body.rank,
      status: req.body.status,
      categories: req.body.categories,
      chapters: req.body.chapters,
      comments: req.body.comments,
    };

    NovelModel.create(data)
      .then((response) => {
        res.send(response);
      })
      .catch((e) => {
        res.send(e);
      });
  }

  update_novel(req: Request, res: Response) {
    const data = {
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      rank: req.body.rank,
      status: req.body.status,
      categories: req.body.categories,
      chapters: req.body.chapters,
      comments: req.body.comments,
    };

    NovelModel.updateOne(data)
      .then((response) => {
        res.send(response);
      })
      .catch((e) => {
        res.send(e);
      });
  }

  delete_novel(req: Request, res: Response) {
    const data = {
      title: req.body.title,
      author: req.body.author,
    };

    NovelModel.deleteOne(data)
      .then((response) => {
        res.send(response);
      })
      .catch((e) => {
        res.send(e);
      });
  }
}
