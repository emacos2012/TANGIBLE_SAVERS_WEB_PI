'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/authContext';
import { updateUserProfile } from '@/lib/piAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ProfilePage: React.FC = () => {
  const { user, updateProfile, logout, loading } = useAuth();
  const [editing, setEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: '',
    estateLocation: '',
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        estateLocation: user.estateLocation || '',
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setIsLoading(true);
      await updateProfile({
        username: formData.username,
        estateLocation: formData.estateLocation,
      });
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#1A237E] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black p-4 pb-24">
      <div className="max-w-2xl mx-auto">
        <Link href="/">
          <button className="mb-6 bg-[#FFD700] text-[#1A237E] hover:bg-[#FFC700] px-4 py-2 rounded font-semibold transition">
            ← Back to Home
          </button>
        </Link>

        <h1 className="text-3xl font-bold text-[#1A237E] dark:text-[#FFD700] mb-6">My Profile</h1>

        {/* Profile Card */}
        <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-6 mb-6">
          <div className="mb-6 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#1A237E] to-[#FFD700] rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-4xl">👤</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{user.username}</h2>
            <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
          </div>

          {/* Profile Info */}
          <div className="space-y-4 mb-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded">
              <p className="text-sm text-gray-600 dark:text-gray-400">Pi UID</p>
              <p className="font-mono text-gray-900 dark:text-white break-all">{user.piUid || 'Not connected'}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded">
              <p className="text-sm text-gray-600 dark:text-gray-400">Estate Location</p>
              <p className="text-gray-900 dark:text-white">{user.estateLocation || 'Not selected'}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded">
              <p className="text-sm text-gray-600 dark:text-gray-400">Member Since</p>
              <p className="text-gray-900 dark:text-white">
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>

          {/* Edit/Save Toggle */}
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="w-full bg-[#1A237E] text-white hover:bg-[#283593] py-2 rounded font-semibold transition"
            >
              Edit Profile
            </button>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Estate Location
                </label>
                <input
                  type="text"
                  value={formData.estateLocation}
                  onChange={(e) => setFormData({ ...formData, estateLocation: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white text-gray-900"
                  placeholder="e.g., Downtown Estate"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-[#FFD700] text-[#1A237E] hover:bg-[#FFC700] py-2 rounded font-semibold transition disabled:opacity-50"
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="flex-1 border border-gray-300 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 py-2 rounded font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Saved Assets */}
        <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">💾 Saved Assets</h3>
          {user.savedAssets && user.savedAssets.length > 0 ? (
            <div className="space-y-2">
              {user.savedAssets.map((asset: string, idx: number) => (
                <div key={idx} className="bg-white dark:bg-gray-800 p-3 rounded text-gray-900 dark:text-white">
                  {asset}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No saved assets yet</p>
          )}
        </div>

        {/* Account Actions */}
        <div className="space-y-2">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white hover:bg-red-700 py-3 rounded font-semibold transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
