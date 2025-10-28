const loginWith = async (page, username, password)  => {
  //await page.getByRole('button', { name: 'login' }).click()
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const newBlog = async (page, author, title, url)  => {

  await page.getByRole('button', { name: 'create new blog' }).click()
  await page.getByLabel('title:').fill(title)
  await page.getByLabel('author:').fill(author)
  await page.getByLabel('url:').fill(url)
  await page.getByRole('button', { name: 'create' }).click()
  await page.getByRole('button', { name: 'cancel' }).click()
}


const newUser = async (request, newData)=>{
    
    await request.post('http://localhost:3003/api/users', 
      newData
    )

    
}

export { loginWith, newBlog, newUser }