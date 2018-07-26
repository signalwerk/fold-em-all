import React, { Component } from 'react'

export default class ImageUploader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: '',
      imagePreviewUrl: '',
      imageUrl: ''
    }
    this._handleImageChange = this._handleImageChange.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
  }

  _handleSubmit(e) {
    e.preventDefault()
    let upload = this._uploadImage(this.state.file)
      .then(response => {
        this.setState({
          imageUrl: JSON.parse(response).url.original
        })
      })
      .catch(error => {
        console.log('upload error', error)
      })
      .finally(() => {
        this.props.action(this.state.imageUrl)
      })
  }

  _uploadImage(file) {
    return new Promise((resolve, reject) => {
      let imageFormData = new FormData()

      imageFormData.append('file', file)

      var xhr = new XMLHttpRequest()

      xhr.open('post', '//media.signalwerk.ch/upload/', true)

      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(xhr.response)
        } else {
          reject(xhr.statusText)
        }
      }

      xhr.send(imageFormData)
    })
  }

  _handleImageChange(e) {
    e.preventDefault()

    let reader = new FileReader()
    let file = e.target.files[0]

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      }, () => {
        this._handleSubmit(e)
      })
    }
    reader.readAsDataURL(file)
  }

  render() {
    return (
      <input type="file" onChange={this._handleImageChange} />
    )
  }
}
