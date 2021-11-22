import { Board } from './board';
import { Card } from './card';
import { Comment } from './comment';
import { List } from './list';


export class DataTransformer{

    transform(data): Board[] {
        return this.getBoards(data);
    }

    getBoards(data){
        let boards:Board[] = [];
        for(let element of data.boards){
            const board = this.createBoardObject(element,data);
            boards.push(board);
        }
        return boards;
    }

    createBoardObject(boardData,data): Board {
        const board = new Board();
        board.boardId = boardData.boardId;
        board.boardTitle = boardData.boardTitle;
        this.assignLists(board, data);
        return board;
    }

    assignLists(board: Board,data){
        const listArray = data.lists.filter(list => list.boardId == board.boardId);
        const listObjectArray: List[] = this.getListObjects(listArray,data);
        board.lists = listObjectArray
    }

    getListObjects(listArray,data): List[] {
        return listArray.map(list => this.createListObject(list,data));
    }

    createListObject(list,data):List {
        const listObj = new List();
        listObj.listId = list.listId;
        listObj.listTitle = list.listTitle;
        this.assignCards(listObj,data);
        return list;
    }

    assignCards(list: List, data){
       const cardArray =  data.cards.filter(card => card.listId == list.listId);
       const cards: Card[] = this.formCardObjects(cardArray,data);
       list.cards = cards;
    }

    formCardObjects(cardArray,data):Card[] {
        return cardArray.map(card => this.createCardObject(card,data));
    }

    createCardObject(card,data): Card{
        const cardObj = new Card();
        cardObj.cardId = card.cardId;
        cardObj.cardTitle = card.cardTitle;
        this.assignComments(card,data);
        return cardObj;
    }

    assignComments(card:Card, data){
        const commentArray = data.comments.filter(comment => comment.cardId == card.cardId);
        this.formCommentObjects(commentArray);
    }

    formCommentObjects(commentArray): Comment[] {
        return commentArray.map(comment => this.createCommentObject(comment));
    }

    createCommentObject(comment): Comment {
        const commentObj = new Comment();
        commentObj.commentId = comment.commentId;
        commentObj.commentText = comment.commentText;
        return commentObj;
    }

}