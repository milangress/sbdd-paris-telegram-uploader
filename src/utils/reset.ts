import type { FileFlavor } from '@grammyjs/files';
import type { MyContext } from '../types';

export function resetSession(ctx: FileFlavor<MyContext>) {
    ctx.session.step = 'idle';
    ctx.session.fileId = undefined;
    ctx.session.fileType = undefined;
    ctx.session.fileName = undefined;
    ctx.session.filePath = undefined;
    ctx.session.description = undefined;
    ctx.session.orientation = undefined;
    ctx.session.tarotCard = undefined;
    ctx.session.targetFolder = undefined;
}
