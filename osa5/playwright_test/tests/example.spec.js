const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, newBlog, newUser } = require('./helper')



describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    
    await request.post('http://localhost:3003/api/testing/reset')
    newUser( request,
              {data: {
                name: 'Matti Luukkainen',
                username: 'mluukkai',
                password: 'salainen'
                }
              })
    await page.goto('http://localhost:5173')


  })

  test('Login form is shown', async ({ page }) => {

    await expect(page.getByText('Login', {exact : true})).toBeVisible()
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
  })

  describe('Login', () => {


    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByLabel('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'väärä')
      await expect(page.getByLabel('Matti Luukkainen logged in')).not.toBeVisible()
    })

    describe('When logged in', () => {

      test('a new blog can be created', async ({ page }) => {

        await loginWith(page, 'mluukkai', 'salainen')
        await newBlog(page, 'Ilmo Kapanen', 'About G-code', 'www.3Dprinting.com')
        await expect(page.getByText('About G-code Ilmo Kapanen').first()).toBeVisible()

        
      })

      test('a blog can be liked', async ({ page }) => {

        await loginWith(page, 'mluukkai', 'salainen')
        await newBlog(page, 'Ilmo Kapanen', 'About G-code', 'www.3Dprinting.com')
        await page.getByRole('button', {name : 'view'}).click()
        await page.getByRole('button', {name : 'like'}).click()
        await expect(page.getByText('likes 1')).toBeVisible()

        
      })

      test('a blog can be removed by the same user', async ({ page }) => {

        await loginWith(page, 'mluukkai', 'salainen')
        await newBlog(page, 'Ilmo Kapanen', 'About G-code', 'www.3Dprinting.com')
        page.on('dialog', async dialog => await dialog.accept())
        await page.getByRole('button', {name : 'view'}).click()
        await page.getByRole('button', {name : 'remove'}).click()
        await expect(page.getByText('About G-code Ilmo Kapanen').first()).not.toBeVisible()

        
      })  
      
      test('a blog cannot be removed by different user', async ({ page, request }) => {

        await loginWith(page, 'mluukkai', 'salainen')
        await newBlog(page, 'Santeri Koponen', 'About G-code part2', 'www.3Dprinting.com')
        await  newUser( request,
              {data: {
                name: 'Ilmo Kapanen',
                username: 'IlmoK',
                password: 'salainen'
                }
              })
        await page.getByLabel('Matti Luukkainen logged in').click()
        await loginWith(page, 'IlmoK', 'salainen')
        await page.getByRole('button', {name : 'view'}).click()
        await expect(page.getByRole('button', {name : 'remove'})).not.toBeVisible()

        
      })  


      test('Blogs are sorted based on likes', async ({ page, request }) => {

        test.slow()

        await request.post('http://localhost:3003/api/testing/reset')

        newUser( request,
              {data: {
                name: 'Matti Luukkainen',
                username: 'mluukkai',
                password: 'salainen'
                }
              })

        await page.goto('http://localhost:5173')
        await loginWith(page, 'mluukkai', 'salainen')
        await newBlog(page, 'Santeri Koponen', 'About G-code part 1', 'www.3Dprinting.com')
        await newBlog(page, 'Olli Juhanila', 'About G-code part 2', 'www.3Dprinting.com')
        await newBlog(page, 'Olli Juhanila', 'About G-code part 3', 'www.3Dprinting.com')


        var likes = [3, 5, 1] 
        var i = 0

        for ( const button of await page.getByRole('button', {name : 'view'}).all()){

          await button.click()
          for (let l=0; l<likes[i]; l++){
            await page.getByRole('button', {name : 'like'}).click()
          }
          await page.getByRole('button', {name : 'hide'}).click()
          i += 1

        }

        await expect(page.getByTestId("article 0")).toContainText('About G-code part 2')
        await expect(page.getByTestId("article 1")).toContainText('About G-code part 3')
        await expect(page.getByTestId("article 2")).toContainText('About G-code part 1')
        

      })  
      
    })
  })
})