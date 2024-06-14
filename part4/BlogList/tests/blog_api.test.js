const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const initialBlogs = [
        {
          _id: "5a422aa71b54a676234d17f8",
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          likes: 5,
          __v: 0
        },
        {
          _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 12,
          __v: 0
        }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let newObj = new Blog(initialBlogs[0])
    await newObj.save()
    newObj = new Blog(initialBlogs[1])
    await newObj.save()
})

const api =supertest(app)
test('Blogs are returned as json',  async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

})

test('There are two Blogs', async () => {
    const result = await api.get('/api/blogs')
    // const contents = result.body.map(e => e.content)
    assert.strictEqual(result.body.length, initialBlogs.length)
})

test('Blog post unique identifier is id not _id',  async () => {
  const result = await api.get('/api/blogs')
  const blog = result.body[0]
  assert.strictEqual(blog.id, initialBlogs[0]._id)
  assert.strictEqual(blog._id, undefined)
})

test('POST request to the /api/blogs creates a new blog post.', async () => {
  const newBlog = {
    title: 'New Blog',
    author: 'New Author',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const result = await api.get('/api/blogs')
  assert.strictEqual(result.body.length, initialBlogs.length + 1)
  const contents = result.body.map(e => e.title)
  assert(contents.includes('New Blog'))

})

test('likes defaults to 0 if missing from the request', async () => {
  const newBlog= {
    title: 'Test blog',
    content: "this is a likes test",
    author: "yves",
    url: "www.testlikes"
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const result = await api.get('/api/blogs')
  const blog = result.body.find(e => e.title === 'Test blog')
  assert.strictEqual(blog.likes, 0)

})

test('responds with 400 Bad Request if title is missing', async () => {
  const newBlog = {
    author: 'New Author',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
  await api
   .post('/api/blogs')
   .send(newBlog)
   .expect(400)
  }
)

test('responds with 400 Bad Request if url is missing', async () => {
  const newBlog = {
    title: 'New Blog',
    author: 'New Author',
    likes: 5,
    __v: 0
  }
  await api
   .post('/api/blogs')
   .send(newBlog)
   .expect(400)
  }
)

after(async () => {
    await mongoose.connection.close()
})