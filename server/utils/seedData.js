const mongoose = require('mongoose');
const User = require('../models/User');
const Category = require('../models/Category');
const Post = require('../models/Post');

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Post.deleteMany({});
    
    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin'
    });
    
    // Create regular user
    const regularUser = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'user'
    });
    
    // Create categories
    const categories = await Category.create([
      {
        name: 'Technology',
        description: 'Posts about technology and programming'
      },
      {
        name: 'Lifestyle',
        description: 'Posts about lifestyle and personal development'
      },
      {
        name: 'Travel',
        description: 'Posts about travel and adventures'
      }
    ]);
    
    // Create sample posts
    const posts = await Post.create([
      {
        title: 'Getting Started with MERN Stack',
        content: 'The MERN stack is a popular choice for building modern web applications. It consists of MongoDB, Express.js, React, and Node.js. In this post, we will explore how to set up a basic MERN application and understand the role of each technology in the stack.',
        excerpt: 'Learn how to build modern web applications with the MERN stack',
        author: adminUser._id,
        category: categories[0]._id,
        tags: ['MERN', 'React', 'Node.js', 'MongoDB'],
        isPublished: true
      },
      {
        title: 'The Art of Minimalist Living',
        content: 'Minimalism is more than just having fewer possessions. It is about finding freedom from the things that weigh us down and focusing on what truly matters. In this post, we explore the principles of minimalist living and how to apply them to your daily life.',
        excerpt: 'Discover the principles of minimalist living and find freedom',
        author: regularUser._id,
        category: categories[1]._id,
        tags: ['minimalism', 'lifestyle', 'simplicity'],
        isPublished: true
      },
      {
        title: 'Hidden Gems of Southeast Asia',
        content: 'Southeast Asia is home to some of the most beautiful and diverse destinations in the world. From pristine beaches to ancient temples, bustling cities to peaceful villages, there is something for every type of traveler. Join us as we explore some of the hidden gems that make this region so special.',
        excerpt: 'Explore the most beautiful hidden destinations in Southeast Asia',
        author: adminUser._id,
        category: categories[2]._id,
        tags: ['travel', 'Southeast Asia', 'adventure'],
        isPublished: true
      }
    ]);
    
    console.log('Sample data seeded successfully');
    console.log(`Created ${categories.length} categories`);
    console.log(`Created ${posts.length} posts`);
    console.log('Admin credentials: admin@example.com / password123');
    console.log('User credentials: john@example.com / password123');
    
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

module.exports = seedData;