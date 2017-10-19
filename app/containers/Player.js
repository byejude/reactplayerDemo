import React,{Component} from 'react';
import ReactPlayer from 'react-player';
import classnames from 'classnames';
import '../style/input-range.css';
import {Link,Route} from 'react-router-dom';
import ListPage from './ListPage';
export default class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index:Math.floor(Math.random()*10),
            playing:false,
            value:'',
            rangeStyle:null,
            loaded:false,
        };
        this.playPause = this.playPause.bind(this);
        this.onDuration = this.onDuration.bind(this);
        this.onProgress = this.onProgress.bind(this);
        this.onChange = this.onChange.bind(this);
        this.playPrev = this.playPrev.bind(this);
        this.playNext = this.playNext.bind(this);
    }

    componentDidMount(){
        this.fetchData();
    }

    fetchData(){
        fetch('https://ali-qqmusic.showapi.com/top?topid=5',{
            headers:{
                Authorization:'APPCODE b83d93a9caf5439883d4e215a2a404e7'
            }
        }).then(res =>{
            return res.json()
        }).then(res =>{
            this.setState({
                loaded:true,
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
            duration: this.formatTime(time),
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
            currentTime1:state.playedSeconds? this.formatTime(state.playedSeconds): '00:00'
        });
        if(this.state.value ===1){
            // 播放下一首
            this.playNext(sessionStorage.getItem('index') ? sessionStorage.getItem('index') : this.state.index);
        }

    }

    onChange(e){
        const percent_long = e.target.value*100+'%';
        const percent_weight = '100%';
        this.setState({
            playing:true,
            value:parseFloat(e.target.value),
            rangeStyle:percent_long+' '+percent_weight,
        });
        this.player.seekTo(parseFloat(e.target.value));
    }

    formatTime(timeTemp){
        let m = Math.floor(timeTemp/60);
        let s = Math.floor(timeTemp%60);

        return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
    }

    playPrev(e){
        let eIndex = parseFloat(e.currentTarget.dataset.index);
        sessionStorage.setItem('index',eIndex - 1 <0? this.state.song_list.length-1 :eIndex-1);
        this.setState({
            playing : true
        })
    }
    playNext(e) {
        let eIndex = typeof e === 'object' ? parseFloat(e.currentTarget.dataset.index) : parseFloat(e);
        sessionStorage.setItem('index', eIndex + 1 > 9 ? 0 : eIndex + 1);
        this.setState({
            playing: true
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
                    <ReactPlayer url={url} style={{display:'none'}} playing={this.state.playing} controls={true} ref={player =>{this.player = player}} onProgress={this.onProgress} onDuration={this.onDuration} />
                    <div className="components-player">
                        <div className="components-album" >
                            <div className={classnames('ablum-pic',this.state.playing? 'playing':'paused')}
                            style={{background:`url(${albumpic_big}) center center`,backgroundSize:'cover'}}>
                            </div>
                        </div>
                        <div className="ablum-title">
                            <p>{songname}</p>
                            <p>{singername}</p>
                        </div>
                        <div className="components-player-control">
                            <div className="player-time">
                                <div className="time_left">{this.state.currentTime1}</div>
                                <div className="player-range">
                                    <input type='range' min={0} max={1} step='any' value={this.state.value || '0'}
                                           style={{background: this.props.background, backgroundSize: this.state.rangeStyle}} onChange={this.onChange}/>
                                </div>
                                <div className="time_right">{this.state.duration}</div>
                            </div>
                            <div className="player-btn">
                                <a href="javascript:;" onClick={this.playPrev} data-index={currentIndex} className="play-prev"></a>
                                <a href="javascript:;" onClick={this.playPause} className={classnames('play-control', this.state.playing ? 'play-control-pause' : '')}></a>
                                <a href="javascript:;" onClick={this.playNext} data-index={currentIndex} className="play-next"></a>
                            </div>
                        </div>
                    </div>
                    <Route path='/list' component={ListPage}/>
                </div>
            )
        }else {
            return (
                <div className="loading">加载数据中....</div>
            )
        }
    }

}

Player.defaultProps = {
    background: '-webkit-linear-gradient(#ea6248, #ea6248) no-repeat, #ddd'
};