import React,{Component} from 'react' 
import ReactDOM from 'react-dom' 
import SearchBar from './components/search_bar' 
import VideoList from './components/video_list' 
import YTSearch from 'youtube-api-search'; 
import VideoDetail from './components/video_detail' 
import _ from 'lodash' 
import Header from './components/Header';
const API_KEY = 'AIzaSyD5VMGC7u8K7skXt9CbNPxBiIO8_cSwQzk'; 


class App extends Component 
{ 
    constructor(props) 
    { 
        super(); 
        this.state={ videos:[], 
        selectedVideo : null }; 
        
       this.videoSearch('signzy'); 
    }; 
     
    videoSearch(term) 
    { 
        YTSearch({key:API_KEY,term:term},(videos) => 
        { 
       this.setState({videos:videos,selectedVideo:videos[0]}, 
); }); 
         
    } 
    render(){ 
        const videoSearch = _.debounce((term)=>{this.videoSearch(term)},300) 
    return (<div className = "top"> 
        <div className ="container" > 
            <Header/>
            <SearchBar onSearchTermChange ={videoSearch}/> 
            <VideoDetail  
                video={this.state.selectedVideo} /> 
            <VideoList  
                onVideoSelect = {selectedVideo => this.setState({selectedVideo})} 
                videos={this.state.videos} /> 
         </div>
    </div>)}; 
}; 
 
ReactDOM.render(<App />,document.getElementById('app'));