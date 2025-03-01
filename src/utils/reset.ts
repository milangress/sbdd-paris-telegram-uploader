import type { MyContext } from '../types';

export async function resetSession(ctx: MyContext) {
    ctx.session.step = 'idle';
    ctx.session.fileId = undefined;
    ctx.session.fileType = undefined;
    ctx.session.fileName = undefined;
    ctx.session.filePath = undefined;
    ctx.session.description = undefined;
    ctx.session.orientation = undefined;
    ctx.session.tarotCard = undefined;
    ctx.session.house = undefined;
    ctx.session.uuid = undefined;
    ctx.session.targetFolder = undefined;
    await ctx.reply('You can start a new upload now.');
}
