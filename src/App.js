import React, { Component } from 'react';
import './App.css';
import RecipeList from './components/RecipeList'
import RecipeDetail from './components/RecipeDetail'
import {recipes} from './tempList'
class App extends Component {
  state={
    recipes:recipes,
    url:"https://www.food2fork.com/api/search?key=57a32b8fe2fabb0abfd131b30b373059",
    base_url:"https://www.food2fork.com/api/search?key=57a32b8fe2fabb0abfd131b30b373059",
    details_id:35383,
    pageIndex:1,
    search:"",
    query:'&q=',
    error:''
  }
  async getRecipes(){
    try {
    const data = await fetch(this.state.url);
    const jsonData = await data.json();
    console.log(jsonData)
    if(jsonData.recipes.length===0){
      this.setState(()=>{
        return{error:'sorry, but your search did not return any result'}
      })
    }else{
      this.setState(()=>{
        return{recipes: jsonData.recipes}
      })
    }
  }catch(error){
      console.log(error);
    }
  }
  componentDidMount(){
    this.getRecipes()
  }
 
  displayPage=(index)=>{
    switch(index){
      default:
      case 1:
      return(<RecipeList
      error={this.state.error}
        recipes={this.state.recipes}
        handleDetails={this.handleDetails}
        value={this.state.search}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}/>)
      case 0:
      return(<RecipeDetail  id={this.state.details_id} handleIndex={this.handleIndex}/>)
    }
  }
  handleIndex=index=>{
    this.setState({
      pageIndex:index
    })
  }
  handleDetails=(index,id)=>{
    this.setState({
      pageIndex:index,
      details_id:id
    })
  }
  handleChange=(e)=>{
    this.setState({
      search:e.target.value
    },()=>{
      console.log(this.state.search)
    })
  }
  handleSubmit=(e)=>{
    e.preventDefault();
    const{base_url,query,search}=this.state;
    this.setState(
      ()=>{
      return {url:`${base_url}${query}${search}`,search:""};
    },
    ()=>{
      this.getRecipes();
    })

  }
  render() {
    // console.log(this.state.recipes);
    return (
      <React.Fragment>
        {this.displayPage(this.state.pageIndex)}
      </React.Fragment>
    );
  }
}
export default App;
