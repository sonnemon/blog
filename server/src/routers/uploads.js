import multer from 'multer';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();

const uploadCoverPost = multer({
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, 'public/images/posts/covers/');
		},
		filename: (req, file, cb) => {
			const nameImage = `${uuidv4()}.jpg`;

			req.body.nameImage = nameImage;
			cb(null, nameImage);
		}
	})
});

const uploadDisplayPost = multer({
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, 'public/images/posts/display/');
		},
		filename: (req, file, cb) => {
			const nameImage = `${uuidv4()}.jpg`;

			req.body.nameImage = nameImage;
			cb(null, nameImage);
		}
	})
});

const uploadPictureUser = multer({
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, 'public/images/users/');
		},
		filename: (req, file, cb) => {
			const nameImage = `${uuidv4()}.jpg`;

			req.body.nameImage = nameImage;
			cb(null, nameImage);
		}
	})
});

router.post('/coverpost', uploadCoverPost.single('image'), (req, res, next) => {
	res.json({
		nameImage: `/images/posts/covers/${req.body.nameImage}`
	});
});

router.post('/display', uploadDisplayPost.single('image'), (req, res, next) => {
	res.json({
		nameImage: `/images/posts/display/${req.body.nameImage}`
	});
});

router.post('/users', uploadPictureUser.single('image'), (req, res, next) => {
	res.json({
		nameImage: `/images/users/${req.body.nameImage}`
	});
});

export default router;
