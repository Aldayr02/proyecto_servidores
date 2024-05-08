import { Request, Response } from 'express';
import { response_status } from '../utils/response_status';
import NovelModel from '../models/novels-model';

export class NovelsController {
  all(req: Request, res: Response) {
    NovelModel.find({})
      .then((response) => {
        res.render('lib', {
          novels: response,
        });
      })
      .catch((e) => {
        res.send(e);
      });
  }

  get_novel(req: Request, res: Response) {
    console.log('Pito');
    NovelModel.findOne({ title: req.params.title })
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
    NovelModel.deleteOne({ title: req.params.title })
      .then((response) => {
        res.send(response);
      })
      .catch((e) => {
        res.send(e);
      });
  }
}
