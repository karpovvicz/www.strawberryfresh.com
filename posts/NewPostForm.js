import { useRef, useState } from 'react';
import Card from '../ui/Card';
import classes from './NewPostForm.module.css';

function NewPostForm(props) {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const videoInputRef = useRef();
  const commentInputRef = useRef();
  const permalinkInputRef = useRef();
  const descriptionInputRef = useRef();
  const slugInputRef = useRef();
  const upvotesInputRef = useRef();
  const subredditInputRef = useRef();
  const categoryInputRef = useRef();
  const sourceInputRef = useRef();

  // File upload states
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // File input refs
  const imageFileInputRef = useRef();
  const videoFileInputRef = useRef();

  const handleFileUpload = async (file, type) => {
    if (!file) return;

    setIsUploading(true);
    setUploadError('');

    const formData = new FormData();
    formData.append(type === 'image' ? 'image' : 'video', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed');
      }

      if (type === 'image') {
        setUploadedImage(result.urls.image);
        imageInputRef.current.value = result.urls.image.url;
      } else {
        setUploadedVideo(result.urls.video);
        videoInputRef.current.value = result.urls.video.url;
      }
    } catch (error) {
      setUploadError(`Upload failed: ${error.message}`);
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      handleFileUpload(file, type);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, type) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file, type);
    }
  };

  const removeUploadedFile = (type) => {
    if (type === 'image') {
      setUploadedImage(null);
      imageInputRef.current.value = '';
    } else {
      setUploadedVideo(null);
      videoInputRef.current.value = '';
    }
  };

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredVideo = videoInputRef.current.value;
    const permalinkAddress = permalinkInputRef.current.value;
    const enteredUpvotes = upvotesInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredSlug = slugInputRef.current.value;
    const enteredSubreddit = subredditInputRef.current.value;
    const enteredComment = commentInputRef.current.value;
    const selectedCategory = categoryInputRef.current.value;
    const enteredSource = sourceInputRef.current.value;

    const postData = {
      title: enteredTitle,
      image: enteredImage,
      video: enteredVideo,
      address: permalinkAddress,
      upvotes: enteredUpvotes,
      subreddit: enteredSubreddit,
      description: enteredDescription,
      slug: enteredSlug,
      comment: enteredComment,
      category: selectedCategory,
      source: enteredSource,
      createdAt: new Date().toISOString(),
    };

    props.onAddPost(postData);
  }

  return (
      <Card>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor='address'>Address</label>
            <input type='url' required id='permalink' ref={permalinkInputRef}/>
          </div>

          <div className={classes.control}>
            <label htmlFor='slug'>Slug</label>
            <textarea id='slug' required rows='1' ref={slugInputRef}>strawberryfresh_</textarea>
          </div>

          <div className={classes.control}>
            <label htmlFor='title'>Title</label>
            <input type='text' required id='title' ref={titleInputRef}/>
          </div>

          {/* Image Upload Section */}
          <div className={classes.control}>
            <label htmlFor='image'>Image</label>
            <div className="space-y-2">
              {/* File Upload */}
              <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'image')}
              >
                <input
                    type="file"
                    ref={imageFileInputRef}
                    onChange={(e) => handleFileChange(e, 'image')}
                    accept="image/*"
                    className="hidden"
                />
                <button
                    type="button"
                    onClick={() => imageFileInputRef.current?.click()}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                    disabled={isUploading}
                >
                  {isUploading ? 'Uploading...' : '📁 Choose Image or Drag & Drop'}
                </button>
              </div>

              {/* Image Preview */}
              {uploadedImage && (
                  <div className="relative">
                    <img
                        src={uploadedImage.url}
                        alt="Uploaded"
                        className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                        type="button"
                        onClick={() => removeUploadedFile('image')}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
              )}

              {/* URL Input (Fallback) */}
              <div className="mt-2">
                <label className="text-sm text-gray-600">Or enter image URL:</label>
                <input type='url' id='image' ref={imageInputRef} className="w-full mt-1"/>
              </div>
            </div>
          </div>

          {/* Video Upload Section */}
          <div className={classes.control}>
            <label htmlFor='video'>Video</label>
            <div className="space-y-2">
              {/* File Upload */}
              <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'video')}
              >
                <input
                    type="file"
                    ref={videoFileInputRef}
                    onChange={(e) => handleFileChange(e, 'video')}
                    accept="video/*"
                    className="hidden"
                />
                <button
                    type="button"
                    onClick={() => videoFileInputRef.current?.click()}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                    disabled={isUploading}
                >
                  {isUploading ? 'Uploading...' : '📁 Choose Video or Drag & Drop'}
                </button>
              </div>

              {/* Video Preview */}
              {uploadedVideo && (
                  <div className="relative">
                    <video
                        src={uploadedVideo.url}
                        controls
                        className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                        type="button"
                        onClick={() => removeUploadedFile('video')}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
              )}

              {/* URL Input (Fallback) */}
              <div className="mt-2">
                <label className="text-sm text-gray-600">Or enter video URL:</label>
                <input type='url' id='video' ref={videoInputRef} className="w-full mt-1"/>
              </div>
            </div>
          </div>

          {/* Upload Error */}
          {uploadError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {uploadError}
              </div>
          )}

          <div className={classes.control}>
            <label htmlFor='upvotes'>Upvotes</label>
            <input type='text' required id='upvotes' ref={upvotesInputRef}/>
          </div>

          <div className={classes.control}>
            <label htmlFor='subreddit'>Subreddit</label>
            <input type='text' required id='subreddit' ref={subredditInputRef}/>
          </div>

          <div className={classes.control}>
            <label htmlFor='highestcomment'>Top Comment</label>
            <textarea id='highestcomment' required rows='7' ref={commentInputRef}></textarea>
          </div>

          <div className={classes.control}>
            <label htmlFor='description'>Description</label>
            <textarea id='description' required rows='5' ref={descriptionInputRef}></textarea>
          </div>

          <div className={classes.control}>
            <label htmlFor='category'>Category</label>
            <select id='category' required ref={categoryInputRef}>
              <option value=''>-- Select Category --</option>
              <option value='technology'>Technology</option>
              <option value='news'>News</option>
              <option value='business'>Business</option>
              <option value='entertainment'>Entertainment</option>
              <option value='music'>Music</option>
              <option value='gaming'>gaming</option>
              <option value='sports'>Sports</option>
              <option value='lifestyle'>Lifestyle</option>
              <option value='funny'>Memes & Humor</option>

            </select>
          </div>

          <div className={classes.control}>
            <label htmlFor='source'>Source</label>
            <select id='source' required ref={sourceInputRef}>
              <option value=''>-- Select Source --</option>
              <option value='reddit'>Reddit</option>
              <option value='X'>X</option>
              <option value='youtube'>YouTube</option>
            </select>
          </div>

          <div className={classes.actions}>
            <button disabled={isUploading}>
              {isUploading ? 'Uploading...' : 'Add Post'}
            </button>
          </div>
        </form>
      </Card>
  );
}

export default NewPostForm;
