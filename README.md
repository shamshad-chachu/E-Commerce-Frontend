

Note : Set up the backend First because i have used Clever databse from 'clever.cloude' to store the datas 
        or else frontend end will not run correctry

        # you can make the database connect to your local device if need 
        anyway project will run 
        # for changing to your locan database i have provided code below 
        # it is not manditory to change if you change means you need add admin data manually to databse 

--------frontend & BACKEND------

1.clone repo from gitHub (Frontend and Backend)

2.run npm install 

3.run npm run dev 

4.for admin loging use  
        email : abcd@gmail.com
        password: 123

5. for user you can creatr new user account 


6.for backend i have used SpringBoot 

7.to run backend you need springWorksace whre you can run 

8.you need to crate one local database to work after that proceed with next (Not manditory /optional)

9.after getting into project folder in backend go to 
                (Local databse setup Optional)
    project -> src -> main -> resources -> application.properties 
            spring.datasource.username={DATABASE USERNAE}
            spring.datasource.url=jdbc:{URL}  ---       (postgresql://localhost:5432/E-Commerce)
            spring.datasource.password={PASSWORD}

    Set all this first before runnuing backend 


10. To Run spring RightClick on Project -> Run AS -> Java Application 

NOTE: for DATABASE used CLOUDE so you need to run the backend First --
