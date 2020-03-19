import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Particles from 'react-particles-js';
import Register from './components/Register/Register';

const particleoptions={
  "particles": {
	        "number": {
	            "value": 400
	        },
	        density:{
  			enable:true,
  			value_area:300
  		},
	        "size": {
	            "value": 3
	        }
	    },
	    "interactivity": {
	        "events": {
	            "onhover": {
	                "enable": true,
	                "mode": "grab"
	            }
	        }
	    }
}
const initialState={
			input:'',
			imageurl:'',
			box:{},
			route:'signin',
			isSignedIn:'',
			user:{
				id:'',
				name:'',
				email:'',
				entries: 0,
				joined: ''
				}
}
class App extends Component{
	constructor(){
		super();
		this.state=initialState;
	}
	loadUser=(data)=>{
		this.setState({user:{
					id:data.id,
					name:data.name,
					email:data.email,
					entries: data.entries,
					joined: data.joined
		}
		})
	}
	calculateFacelocationData= (data)=>{
		const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
		const image=document.getElementById('inputimage');
		const width=Number(image.width);
		const height= Number(image.height);
		return{
			leftCol:clarifaiFace.left_col*width,
			topRow:clarifaiFace.top_row*height,
			rightCol:width-(clarifaiFace.right_col*width),
			bottomRow:height-(clarifaiFace.bottom_row*height)

		}
	}
	displayFaceBox=(box)=>{
		this.setState({box:box});
	}
	onInputChange=(event)=>{
		this.setState({input: event.target.value});
	}
	onButtonSubmit=()=>{
		this.setState({imageurl:this.state.input});
		fetch('https://guarded-savannah-49030.herokuapp.com/imageurl',{
		      method:'post',
		      headers:{'content-Type':'application/json'},
		      body:JSON.stringify({
		      input:this.state.input
     		})
			 })
			.then(response=>response.json())
	.then(response=>{
			if(response){
				fetch('https://guarded-savannah-49030.herokuapp.com/image',{
		      method:'put',
		      headers:{'content-Type':'application/json'},
		      body:JSON.stringify({
		      id:this.state.user.id 
     		})
			 })
				.then(response=>response.json())
				.then(count=>{
					this.setState(Object.assign(this.state.user, {entries:count}))
				})
				.catch(err=>console.log(err))
			}
	    this.displayFaceBox(this.calculateFacelocationData(response))
	})
	.catch(err=>console.log(err)); 
	}
	onRouteChange=(route)=>{
		if(route==='signout'){
			this.setState({isSignedIn:initialState})
		} else if(route==='home'){
			this.setState({isSignedIn:initialState})
		}
		this.setState({route:route});
	}
  render(){
    return (
    <div className="App">
     <Particles className='particles'
        params={particleoptions}
        />
     <Navigation isSignedIn={this.state.isSignedIn }onRouteChange={this.onRouteChange} />
     {this.state.route==='home'
     	?<div>
     	<Logo/>
      	<Rank name={this.state.user.name} entries={this.state.user.entries}/>
        <ImageLinkForm  onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
       	<FaceRecognition box={this.state.box} imageurl={this.state.imageurl }/>
     	</div>
      :( 
      		this.state.route==='signin'
      	?<SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
      	:<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
      	)
  	  }
    </div>
  );
  }  
}

export default App;
