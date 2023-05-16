const Koa = require('koa');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const fs = require('fs');
const path = require('path');
const multer = require('@koa/multer');
const app = new Koa();
const port = 4000;

app.use(cors());
app.use(bodyParser());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'storage'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });
app.use(upload.single('file'));

app.use(async (ctx, next) => {
    if (ctx.path.startsWith('/download/')) {
        const archivoNombre = ctx.path.replace('/download/', '');
        const archivoRuta = path.join(__dirname, 'storage', archivoNombre);
        try {
            const stat = fs.statSync(archivoRuta);
            ctx.attachment(archivoNombre);
            ctx.set('Content-Type', 'application/octet-stream');
            ctx.set('Content-Length', stat.size);
            ctx.body = fs.createReadStream(archivoRuta);
        } catch (error) {
            ctx.status = 404;
            ctx.body = error;
        }
    } else if (ctx.path.startsWith('/upload')) {
        await upload.single('file')(ctx, next);
        const uploadedFile = ctx.file;
        console.log(uploadedFile);
        ctx.body = 'Archivo subido';
    } else {
        await next();
    }
});

app.listen(port, () => {
    console.log(`Servidor Koa escuchando en el puerto ${port}`);
});

// app.use(async (ctx, next) => {
//     if (ctx.path.startsWith('/download/')) {
//         const archivoNombre = ctx.path.replace('/download/', '');
//         const archivoRuta = path.join(__dirname, 'storage', archivoNombre);
//
//         try {
//             const stat = fs.statSync(archivoRuta);
//             ctx.attachment(archivoNombre);
//             ctx.set('Content-Type', 'application/octet-stream');
//             ctx.set('Content-Length', stat.size);
//             ctx.body = fs.createReadStream(archivoRuta);
//         } catch (error) {
//             ctx.status = 404;
//             ctx.body = error;
//         }
//     } else if (ctx.path.startsWith('/upload')) {
//
//     } else {
//         await next();
//     }
// });