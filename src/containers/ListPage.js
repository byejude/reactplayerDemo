import React,{Component} from 'react';
export default class extends Component{
    render(){
        const {currentIndex,songList} = this.props.location.state;
        const list = songList.map((item,i) => {
            <li key={i} onClick={() => {
                this.props.history.replace('/');
                sessionStorage.setItem('index',x);
                }} className={currentIndex == i? 'active_li':''}>{item.songname}--{item.singername}</li>
        });

        return(
           <div className="components-song-list">
               <h1><span>当前列表</span><em onClick={this.props.history.goBack}></em></h1>
               <ul>
                   {list}
               </ul>
           </div>
        )
    }
} 