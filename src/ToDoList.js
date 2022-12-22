import buttonAdd from './next.png';
import buttonRemove from './remove.png';
import buttonEdit from './edit.png';
import buttonReturn from './return.png';
import { useEffect } from 'react'
import { useState } from 'react'
import React from "react";



const getLocalStorage = () => {
    let list = localStorage.getItem("toDoList");
    if (list) {
      return JSON.parse(localStorage.getItem("toDoList"));
    } else {
      return [];
    }
};

const getLocalStorage2 = () => {
    let del = localStorage.getItem("deleteList");
    if (del) {
      return JSON.parse(localStorage.getItem("deleteList"));
    } else {
      return [];
    }
};


function ToDoList() {
    const [state, setState]=useState(true)
    const [userInput,setUserInput]=useState('')
    const [toDoList,setToDoList]=useState(getLocalStorage())
    const [deleteList,setDeleteList]=useState(getLocalStorage2())


//localStorage
    useEffect(() => {
        localStorage.setItem("toDoList", JSON.stringify(toDoList));
        localStorage.setItem("deleteList", JSON.stringify(deleteList));
    }, [toDoList,deleteList]);        

//functions

    const handleSubmit = (e) => {
    e.preventDefault();
    };

    const addItem = () => {
        if (userInput===''){
            alert('Enter your text...')
        }
        else{
            setToDoList([...toDoList,userInput])
            setUserInput('')
        }
    }

    const remove = (item,index) => {
        toDoList.splice(index,1)
        setDeleteList([...deleteList,item])
    }

    const returnItem = (item,index) => {
       deleteList.splice(index,1)
       setToDoList([...toDoList,item])
       if(deleteList.length<1){
        setState(true)
       }
    }

   const edit = (item,index) => {
        let listArray=toDoList;
        let pro=prompt('Enter new text...',item);
        if(pro === null || pro === ""){
            return
        } 
        listArray.splice(index,1,pro);
        setToDoList([...toDoList])
    }

    const deleteDone = () => {
        setDeleteList([])  
        setState(true)
    }

    const deleteAll = () => {
       setToDoList([])
       setDeleteList([]) 
    }

    const show = () => {
       if(deleteList.length<1)return setState(true)
       setState(!state)
    }

    const onKeyDown = e =>{
        if (e.keyCode === 13) {
            addItem()
            setState(true)
        }
    }
console.log('hi')
return(
    <form onKeyDown={onKeyDown}  onSubmit={handleSubmit}>
        
            <div>
                
                <button className='btn' onClick={()=>show()}>Done: {deleteList.length}</button> 

                <div className="container">
                    <input className="inputField" placeholder="Enter your text..." type="text" value={userInput}
          onChange={(e) => setUserInput(e.target.value)}/>
                    <button className="btn" onClick={()=>addItem()}><img className="btnNext" src={buttonAdd} alt="add"/></button>
                    <button className="btn" onClick={()=>deleteAll()}>Delete All</button>
                </div>



                <div className="container">  
                <ul>
                {toDoList.map((item, index)=>(
                        <li key={index}>                 
                        <span className="icon">
                        <img className="imgBtn" src={buttonRemove} onClick={()=>remove(item,index)} alt="Remove"/>
                        <img className="imgBtn" src={buttonEdit} onClick={()=>edit(item,index)} alt="Edit"/>
                        </span>
                        {item }           
                        </li>
                    ))}
                </ul> 
                </div>
            </div>            
        <div  className="container">
                <ul className={state? 'displayNone ':'displayBlock'}>
                <i  onClick={()=> setState(true)} ></i>
                {deleteList.map((item, index)=>(
                    <li key={index}>
                    
                            <span className="icon">               
                            <img className="imgBtn" src={buttonReturn}  onClick={()=>returnItem(item,index)} alt="Return"/>
                            </span> 
                            {item }  
                        </li>
                    ))}
                </ul>
                </div>

                <button className="btn" onClick={()=>deleteDone()}>Clear completed</button>
    </form> 
)
}

export default ToDoList;


/*if i use { Component }
import { Component } from "react";
import buttonAdd from './next.png';
import buttonRemove from './remove.png';
import buttonEdit from './edit.png';
import buttonReturn from './return.png';
export class ToDoList extends Component{
    state = {
        userInput:'',
        toDoList: [],
        deleteList: [],
    }
    onChangeEvent(e){
        this.setState({userInput: e})
    }
    addItem(input){
        if (input===''){
            alert('Enter your text...')
        }
        else{
            let listArray=this.state.toDoList;
            listArray.push(input);
            this.setState({toDoList:listArray, userInput:''})
        }
    }
    remove(input,index){
        let listArray=this.state.toDoList;
        let delArray=this.state.deleteList;
        listArray.splice(index,1);
        delArray.push(input)   
        this.setState({toDoList:listArray})
        this.setState({deleteList:delArray})
    }
    edit(input,index){
        let listArray=this.state.toDoList;
        let pro=prompt('Enter new text...',input);
        if(pro === null || pro === ""){
            return
        } 
        listArray.splice(index,1,pro);
        this.setState({toDoList:listArray})
    }
    return(input,index){
        let listArray=this.state.toDoList;
        let delArray=this.state.deleteList;
        listArray.push(input);
        delArray.splice(index,1)
        this.setState({toDoList:listArray})
        this.setState({deleteList:delArray})
    }
    deleteDone(){
        let delArray=this.state.deleteList;
        delArray=[];
        this.setState({deleteList:delArray})  
    }
    deleteAll(){
        let listArray=this.state.toDoList;
        listArray=[];
        this.setState({toDoList:listArray})
        let delArray=this.state.deleteList;
        delArray=[];
        this.setState({deleteList:delArray}) 
    }
    onFormSubmit(e){
        e.preventDefault()
    }
    render() {
        return(
            <form onSubmit={this.onFormSubmit}>
                <div>
                
                <div className="container">
                    <input className="inputField" value={this.state.userInput} placeholder="Enter your text..." type='text' onChange={(e)=>{this.onChangeEvent(e.target.value)}} />
                    <button className="btn" onClick={()=>this.addItem(this.state.userInput)}><img className="btnNext" src={buttonAdd} alt="add"/></button>
                    <button className="btn" onClick={()=>this.deleteAll()}>Delete All</button>
                </div>
                <div className="container">  
                <ul>
                    {this.state.toDoList.map((item, index)=>(
                        <li key={index}>
                        <span className="icon">
                        <img className="imgBtn" src={buttonRemove} onClick={()=>this.remove(item,index)} alt="Remove"/>
                        <img className="imgBtn" src={buttonEdit} onClick={()=>this.edit(item,index)} alt="Edit"/>
                        </span>
                        {item }           
                        
                        </li>
                    ))}
                </ul> 
                </div>
                <div className="container">
                <ul>
                    {this.state.deleteList.map((item, index)=>(
                        <li  key={index}>
                            <span className="icon">               
                            <img className="imgBtn" src={buttonReturn} onClick={()=>this.return(item,index)} alt="Return"/>
                            </span> 
                            {item }  
                        </li>
                    ))}
                </ul>
                </div>
                <div>
                <button className="btn" onClick={()=>this.deleteDone()}>Clear completed</button>
                </div>
                </div> 
            </form>   
        )
    }
}
export default ToDoList;
*/