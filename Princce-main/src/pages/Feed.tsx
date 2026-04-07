import { useState, useEffect } from 'react';
import { getPosts, addPost, Post } from '../lib/firestore';
import { useAuth } from '../contexts/AuthContext';
import { Send, User } from 'lucide-react';
import Button from '../components/Button';

export default function Feed() {
  const { profile } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    const data = await getPosts();
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim() || !profile) return;
    await addPost(newPost, profile);
    setNewPost('');
    await fetchPosts();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Post an Update</h2>
        <form onSubmit={handlePost} className="flex space-x-3">
          <input
            type="text"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share an update, link, or question..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          <Button type="submit" disabled={!newPost.trim()}>
            <Send className="w-4 h-4 mr-2 inline" />
            Post
          </Button>
        </form>
      </div>

      <div className="space-y-4">
        {loading ? (
          <p className="text-center text-gray-500">Loading feed...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts yet! Be the first to share something.</p>
        ) : (
          posts.map(post => (
            <div key={post.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{post.authorName}</h3>
                  <p className="text-xs text-gray-500 capitalize">{post.authorRole}</p>
                </div>
              </div>
              <p className="text-gray-800">{post.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
