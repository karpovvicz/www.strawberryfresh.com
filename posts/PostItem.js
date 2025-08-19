import { useRouter } from 'next/router'
import Link from 'next/link'

function PostItem(props) {
  const router = useRouter();

  function showDetailsHandler() {
    // Set scroll context before navigation
    if (props.onPostClick) {
      props.onPostClick();
    }
    router.push('/' + props.category + '/' + props.source + '/' + props.slug);
  }

  function shareHandler() {
    // Prevent multiple share attempts
    if (document.getElementById('share-menu')) {
      return;
    }

    const shareData = {
      title: props.title,
      text: props.description || `Check out this post: ${props.title}`,
      url: `${window.location.origin}/${props.category}/${props.source}/${props.slug}`,
    };

    // Try to use native Web Share API first
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      navigator.share(shareData)
          .then(() => {
            console.log('Shared successfully');
          })
          .catch((error) => {
            console.log('Share API error:', error);
            // Only fallback if it's not a user cancellation
            if (error.name !== 'AbortError') {
              fallbackShare();
            }
          });
    } else {
      fallbackShare();
    }
  }

  function fallbackShare() {
    const shareUrl = `${window.location.origin}/${props.category}/${props.source}/${props.slug}`;
    const shareText = `${props.title} - ${shareUrl}`;


    // Create a share menu with multiple options
    const shareOptions = [

      {
        name: 'X(Twitter)',
        action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank')
      },
      {
        name: 'Facebook',
        action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(props.title)}`, '_blank')
      },
      {
        name: 'WhatsApp',
        action: () => window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank')
      },
      {
        name: 'Telegram',
        action: () => window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(props.title)}`, '_blank')
      },
      {
        name: 'Email',
        action: () => window.open(`mailto:?subject=${encodeURIComponent(props.title)}&body=${encodeURIComponent(shareText)}`, '_blank')
      },
      {
        name: 'Copy Link',
        action: () => copyToClipboard(shareUrl)
      }
    ];

    // Show share options
    showShareMenu(shareOptions);
  }

  function copyToClipboard(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
          .then(() => {
            showToast('Link copied to clipboard!');
          })
          .catch(() => {
            showToast('Failed to copy to clipboard');
          });
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        showToast('Link copied to clipboard!');
      } catch (err) {
        showToast('Failed to copy to clipboard');
      }
      document.body.removeChild(textArea);
    }
  }

  function showShareMenu(options) {
    // Remove existing share menu if any
    const existingMenu = document.getElementById('share-menu');
    if (existingMenu) {
      existingMenu.remove();
    }

    // Create share menu
    const menu = document.createElement('div');
    menu.id = 'share-menu';
    menu.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';

    // Close menu when clicking outside
    menu.onclick = (e) => {
      if (e.target === menu) {
        menu.remove();
      }
    };

    const menuContent = document.createElement('div');
    menuContent.className = 'bg-white/95 backdrop-blur-xl rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl border border-white/30';

    // Create menu content with proper event handling
    menuContent.innerHTML = `
      <h3 class="text-lg font-semibold text-zinc-900 mb-4 text-center">Share via</h3>
      <div class="space-y-2" id="share-options">
      </div>
      <button 
        class="w-full mt-4 px-4 py-3 rounded-xl bg-zinc-100 text-zinc-600 font-medium hover:bg-zinc-200 transition-colors duration-200"
        onclick="this.closest('#share-menu').remove()"
      >
        Cancel
      </button>
    `;

    // Add options with proper event listeners
    const optionsContainer = menuContent.querySelector('#share-options');
    options.forEach(option => {
      const button = document.createElement('button');
      button.className = 'w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-xl border border-white/40 text-zinc-700 font-medium text-left hover:bg-white/70 transition-colors duration-200';
      button.textContent = option.name;
      button.onclick = () => {
        menu.remove();
        option.action();
      };
      optionsContainer.appendChild(button);
    });

    menu.appendChild(menuContent);
    document.body.appendChild(menu);
  }

  function showToast(message) {
    // Remove existing toast if any
    const existingToast = document.getElementById('toast');
    if (existingToast) {
      existingToast.remove();
    }

    // Create toast
    const toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-zinc-900 text-white px-6 py-3 rounded-xl shadow-lg z-50';
    toast.textContent = message;

    document.body.appendChild(toast);

    // Remove toast after 3 seconds
    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove();
      }
    }, 3000);
  }

  // Format date elegantly
  function formatDate(dateString) {
    if (!dateString) return '';

    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // If it's today
    if (diffDays === 1) {
      return 'Today';
    }

    // If it's yesterday
    if (diffDays === 2) {
      return 'Yesterday';
    }

    // If it's within the last week
    if (diffDays <= 7) {
      return `${diffDays - 1} days ago`;
    }

    // Otherwise show the date
    const options = {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  }

  // Utility function to get YouTube embed URL
  function getYouTubeEmbedUrl(url) {
    // Match YouTube URLs (watch?v= or youtu.be/)
    const ytMatch = url.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/
    );
    if (ytMatch) {
      return `https://www.youtube.com/embed/${ytMatch[1]}`;
    }
    return null;
  }

  return (
      <li className="mb-8">
        <div
            className="relative bg-white/25 backdrop-blur-xl rounded-3xl shadow-lg border border-white/30 p-6 cursor-pointer transition-all duration-300 hover:bg-white/35 hover:border-blue-400/50 hover:shadow-blue-500/20 active:scale-[0.98] group animate-fade-in"
            onClick={showDetailsHandler}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-blue-50/10 to-teal-50/10 rounded-3xl"></div>
          <div className="relative z-10">
            {/* Meta Information */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Link href={`/${props.category}`} className="bg-gradient-to-r from-blue-500/20 to-teal-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-blue-300/30 text-blue-700 font-semibold text-xs hover:bg-blue-500/30 transition-colors">
                {props.category}
              </Link>
              <Link href={`/${props.category}/${props.source}`} className={`backdrop-blur-sm px-3 py-1 rounded-full border font-semibold text-xs flex items-center gap-1 hover:scale-105 transition-all ${
                props.source === 'youtube' 
                  ? 'bg-gradient-to-r from-red-500/20 to-red-600/20 border-red-300/30 text-red-700 hover:bg-red-500/30' 
                  : props.source === 'reddit' 
                  ? 'bg-gradient-to-r from-orange-500/20 to-orange-600/20 border-orange-300/30 text-orange-700 hover:bg-orange-500/30' 
                  : props.source === 'x' 
                  ? 'bg-gradient-to-r from-gray-700/20 to-gray-800/20 border-gray-600/30 text-gray-800 hover:bg-gray-700/30' 
                  : 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-300/30 text-blue-700 hover:bg-blue-500/30'
              }`}>
                <img 
                  src={`/icons/${props.source === 'youtube' ? 'yt' : props.source === 'reddit' ? 'Reddit' : props.source === 'x' ? 'x' : 'x'}.png`}
                  alt={props.source}
                  className="w-3 h-3 object-contain"
                />
                {props.source}
              </Link>
           
            </div>
            
            <div className="mb-4">
              <h3 className="font-bold text-xl text-zinc-800 dark:text-white mb-2 leading-tight">
                {props.title}
              </h3>
            </div>
            {props.image ? (
                <div className="overflow-hidden rounded-2xl mb-4 relative group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10"></div>
                  <img
                      loading="lazy"
                      src={props.image}
                      alt={props.title}
                      className="w-full h-auto object-contain bg-gradient-to-br from-zinc-50 to-zinc-100"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                  />
                  <div
                      className="w-full h-48 bg-gradient-to-br from-zinc-100 to-zinc-200 flex items-center justify-center text-zinc-500"
                      style={{ display: 'none' }}
                  >
                    <span className="text-lg">🖼️ Image not available</span>
                  </div>
                </div>
                        ) : props.video ? (
                (() => {
                  const embedUrl = getYouTubeEmbedUrl(props.video);
                  if (embedUrl) {
                    return (
                        <div className="relative mb-4 overflow-hidden rounded-2xl group">
                          {/* Gradient overlay */}
                          <div
                              className="absolute inset-0 z-10 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"/>

                          {/* Responsive iframe */}
                          <div className="aspect-video">
                            <iframe
                                src={embedUrl}
                                title={props.title}
                                className="w-full h-full bg-gradient-to-br from-zinc-50 to-zinc-100 rounded-2xl"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                loading="lazy"
                            />
                          </div>
                        </div>
                    );
                  } else {
                    return (
                        <div className="overflow-hidden rounded-2xl mb-4 relative group">
                          <video
                              autoPlay
                              muted
                              playsInline
                              loop
                              src={props.video}
                              controls
                              className="w-full h-auto object-contain bg-gradient-to-br from-zinc-50 to-zinc-100"
                              poster={props.imageFallback || ""}
                          >
                            Your browser does not support the video tag.
                          </video>
                        </div>
                    );
                  }
                })()
            ) : (
                <div
                    className="w-full h-48 bg-gradient-to-br from-zinc-100 to-zinc-200 flex items-center justify-center text-zinc-500 rounded-2xl">
                    <span className="text-lg">🎬 Media not available</span>
                </div>
            )}
            {/* Meta Information and Actions */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
              <div className="flex items-center gap-4">
             
                
                {/* Share Button */}
                <button
                    onClick={(e) => {
                      e.stopPropagation();
                      shareHandler();
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500/10 to-teal-500/10 backdrop-blur-sm border border-blue-300/30 text-blue-700 font-semibold text-sm shadow-lg hover:bg-blue-500/20 hover:border-blue-400/50 hover:shadow-blue-500/20 transition-all duration-300 flex items-center gap-2 group"
                >
                  <span className="text-lg group-hover:scale-110 transition-transform duration-300">📤</span>
                  <span className="hidden sm:inline">Share</span>
                </button>
              </div>

              {/* Date Display */}
              <div className="flex flex-col items-end">
                <span className="text-xs text-zinc-500/70 font-medium tracking-wide uppercase hidden sm:block">
                  Added
                </span>
                <span className="text-xs sm:text-sm text-zinc-700 font-medium">
                  {formatDate(props.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </li>
  );
}

export default PostItem;
