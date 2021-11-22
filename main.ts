import { Board } from './board';
import { BoardRender } from './BoardRender';
import { DataTransformer } from './data-transformer';
import { sample } from './input';

const transformer = new DataTransformer();
const boards: Board[] = transformer.transform(sample);
const boardRender: BoardRender = new BoardRender();
boardRender.renderBoard(boards[0]);
