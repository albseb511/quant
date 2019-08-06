import React, {Component} from 'react';
import './search.css'
import {API_KEY} from '../../assets/aplha/config'
var DEMO_API_KEY='demo'

//TODO
// bugs.
// 1. Style changes sometimes, cannot accomodate large texts. 
// 2. when clearing out input field, the app crashes, could be becasue API is requesting empty value

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state={
            sbarBodyStyle:'sbarBody',
            cancel:'cancel-hidden',
            searchInput:'',
            resultState:false,
            searchResults:{symbol:'',
                            name:'HElLo',type:'',
                            region:'',
                            marketOpen:'',
                            marketClose:'',
                            timezone:'',
                            currency:'',
                            matchScore:''}
        }
    }

    handleInputClick = () => {
        this.setState({cancel:'cancel-visible',
                        sbarBodyStyle:'sbarBody-active'})
    }
    handleCancelClick = () => {
        this.setState({cancel:'cancel-hidden',
                        sbarBodyStyle:'sbarBody',
                        resultState:false,
                        searchResults:'',
                        searchInput:''})
    }
    handleChange = (e) => {
        this.setState({searchInput:e.target.value})
        if(e.target.value!=''){
            fetch('https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords='+e.target.value+'&apikey='+API_KEY)
            .then(response=>response.json())
            .then(responseJson=>{
                this.setState({searchResults: responseJson.bestMatches,
                                resultState: true})
                console.log('called api')
                }
            ).catch((err)=>{
                console.log(err)
            })
        }
        else
            this.setState({searchResults:'',
                            resultState:false})

        this.setState({sbarBodyStyle: this.state.searchResults.length>0?'sbarBody-active-results':'sbarBody-active'})
        
    }

    render(){
        return (
            <div className={this.state.sbarBodyStyle}>
                <div className="sbar">
                    <input className="input" 
                            placeholder="Add a stock" 
                            onFocus={this.handleInputClick} 
                            onBlur={this.handleCancelClick}
                            onChange={(e)=>this.handleChange(e)}
                            value={this.state.searchInput}/>
                    <div className={this.state.cancel} 
                        onClick={this.handleCancelClick}>Cancel</div>
                </div>

                {this.state.resultState?this.state.searchResults.map((data,index)=>
                (
                <div key={index}>
                    <SearchResults data={data}/>
                </div>)):
                        null
                        }
            </div>
        );
    }
};

class SearchResults extends Component{
    constructor(props){
        super(props)
        this.state ={
            style:'results-item',
            data:this.props.data
        }
    }

    handleAdd = () =>{
        
    }

    render(){
        return(
                <div className="results-item" onClick={()=>{}}>
                    <div>
                        {this.props.data['1. symbol']}{'    '}
                    </div>
                </div>
        )
    }
}

export default SearchBar;
