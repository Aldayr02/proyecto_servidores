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

  add_novel(req: Request, res: Response) {
    const user = req.body.name;
    const title = req.body.title;

    NovelModel.findOne(user)
      .then((response) => {
        NovelModel.findOneAndUpdate(
          { _id: response._id },
          { $push: { library: title } },
          { new: true }
        )
          .then((updatedNovel) => {
            if (updatedNovel) {
              res.send(updatedNovel);
            } else {
              res.status(404).send({ message: 'User not found' });
            }
          })
          .catch((error) => {
            res.status(500).send(error);
          });
      })
      .catch((e) => {
        res.send(e);
      });

    // Assuming `novelId` is the ID of the novel we want to update and `updateData` contains the fields we want to update
  }
}
