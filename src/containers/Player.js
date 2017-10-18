import React,{Component} from 'react';
import ReactPlayer from 'react-player';
import ClassName from 'classnames';
import {Link,Route} from 'react-router-dom';
import ListPage from './ListPage'
export default class Player extends Component{
    constructor(props){
        super(props);
        this.state = {
            index:Math.floor(Math.random()*10),
            playing:false,
            value:'',
            rangeStyle:null,
            loaded:false,
        };

    }

    componentDidMount(){
        this.fetchData();
    }

    fetchData(){
        fetch('https://ali-qqmusic.showapi.com/top?topid=26',{
            headers:{
                Authorization:'APPCODE f1b6ad07c1974d63b171c7c569af5584'
            }
        }).then(res =>{
            return res.json();
        }).then(res =>{
            this.setState({
                loaded:true,
                playing::true,
                loaded: true,
                playing:true,
                song_list: res.showapi_res_body.pagebean.songlist.splice(0, 10),
            })
        })
    }

    playPause(){
        this.setState({
            playing: !this.state.playing
        })
    }

    onDuration(time) {
        this.setState({
            duration: this.formateTime(time),
            value: 0,
            currentTime: '00:00',
        })
    }

    onProgress(state){
        const percent_long = state.played*100+'%';
        const percent_weight = '100%';
        this.setState({
            value:state.played,
            rangeStyle:percent_long+' '+percent_weight,
            currentTime:state.playedSeconds? this.formatTime(state.playedSeconds): '00:00'
        });
        if(this.state.value ===1){
            // 播放下一首
        }

    }

    onChange(e){
        const percent_long = e.target.value*100+'%';
        const percent_weight = '100%';
        this.setState({
            playing:true,
            value:parseFloat(e.target.value),
            rangeStyle:percent_long+' '+percent_weight,
        })
        this.player.seekTo(parseFloat(e.target.value));
    }

    formatTime(timeTemp){
        let m = Math.floor(timeTemp/60);
        let s = Math.floor(timeTemp%60);

        return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
    }

    playPrev(e){
        let eIndex = parseFloat(e.currentTarget.dataset.index);
        sessionStorage.setItem('index',eIndex - 1 <0? this.state.song_list.length-1 :eIndex);
        this.setState({
            playing : true
        })
    }

    render(){
        if(this.state.loaded){
            const currentIndex = sessionStorage.getItem('index')? sessionStorage.getItem('index'): this.state.index;
            const currentSong = this.state.song_list[currentIndex];
            const {url, albumpic_big, singername, songname} = currentSong;
            return(
                <div className="components-box">
                    <p className="links">
                        <Link to={{pathname:"/list",state:{songlist:this.state.song_list,currentIndex:currentIndex}}}>我的私人音乐坊</Link>
                    </p>
                </div>
            )
        }
    }

}