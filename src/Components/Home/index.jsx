import React, { Fragment, Component } from 'react';
import './Home.css';
import cloudinary from '../../helpers/cloudinary';

const CLOUD_NAME = 'dqdks9uw7';
const UPLOAD_PRESET = 'Social Tags';
let CURL = 'https://res.cloudinary.com/dqdks9uw7/image/upload/';

export default class Home extends Component {
	state = {
		imageURL: null,
	};
	showWidget = () => {
		this.widget.open();
	};
	shouldComponentUpdate(prevProps, state) {
		if (state.imageURL !== this.state.imageURL) {
			return true;
		}
		return false;
  }
  componentDidUpdate(){
    cloudinary(this.state.imageURL)
  }
	uploadCloud = (resultData) => {
		if (resultData.event === 'success') {
			CURL += 'w_580,h_390';
			this.setState({
				imageURL:
					CURL + `/${resultData && resultData.info && resultData.info.path}`,
			});
		}
	};
	componentDidMount() {
		this.widget =
			typeof window !== 'undefined' &&
			window.cloudinary.createUploadWidget(
				{
					cloudName: CLOUD_NAME,
					uploadPreset: UPLOAD_PRESET,
				},
				(error, result) => {
					this.uploadCloud(result);
				}
			);
	}

	render() {
		const { imageURL } = this.state;
		return (
			<Fragment>
				<div className='title'>
					<h1>#Hashify!</h1>
					<p>Generate hashtags for your Photos!</p>
				</div>
				{imageURL ? (
					<div className='dropzone'>
						<img src={imageURL} />
					</div>
				) : (
					<div className='dropzone'>
						<div className='info'>
							<p>click here to select image</p>
						</div>
						<div className='hashtags'>
							<input
								id='input1'
								multiple
								onClick={this.showWidget}
								// onChange={handleFiles}
								accept='image/*'
								className='input'
							/>
						</div>
					</div>
				)}
			</Fragment>
		);
	}
}
