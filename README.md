
# -Log-
### - 15/05/24 -
Log to keep track of what I've done and another thing to motivate me. <br>
Started by doing login and sign up stuff with email verification, Social Login, 2FA and password resetting. 
### - 23/05/24
Finished Authentication 2 days ago but was too eager to continue that i went straight onto designing dashboard layout<br>
So far ive done the sidebar for navigation and profile tab for user settings which will be consitent for all pages<br>
Wanted to get some visual design done first before moving onto routing pages and adding boards.
### - 24/05/24 -
Learnt how to do modals on web apps (dialog components nested in root layout.tsx file with zustand state management, very cool stuff),
Users upon pressing create board will have a dialog pop up, they enter name and image, and upon pressing create,<br> 
it closes and board entry along with related table entries are added, tomorrow im going to display these boards on the side nav.<br>
-my "i" key is broken so i have it saved for pasting with ^V, annoyng to code f anyone cares :3
### - 29/05/24 -
Side Navigation, Header, Profile Actions dropdown are functionally finished, <br> 
stylistically need work (color schemes, fonts, hovers and transitions), will do this near the end of project.<br>
After making settings and Account/profile page & actions, i can move onto the core features of the app (very cool)<br>
This is going much faster than expected, ideally ill finish this before September so that i can use it for school (most likely acheiveable). <br>
If i want people to use this tho, the user experience will need to be close to perfect, something to worry about later down the line. <br>
Project fun so far, need to decide wether to use Next.js backend features or move it to django or something, <br>
When i deploy i want to use AWS, but i probably wont since money, ill draw up an architecture with terraform and aws services anyways.
### - 05/05/25 -
Over past days I've included image uploading and displaying using upload thing , cached users into local storage using redis instead of onto main database which i find cool,<br>
I need to decide whether i need a verification token table, otherwise i'll cache that aswell (I love caching) <br>
NOTE: I changed code to simply use cache to verify, no longer neccessary to have a verificationToken table or data utils, not going to delete them tho :3<br>
Made the side nav toggleable on button click, dark and light mode (still deciding on colour scheme, wether to add hint of blue or just plain B/W shades)<br>
Changed database from neon to supabase, I want to migrate from using prisma to using supabase, but i really dont like certain features like their auth and route protecting <br>
I was under the impression that supabase CRUD ops would use sql, which is good cause i get that practice, but API is basically the same as prisma.
Also i dont like the fact im using uploadThing, i would rather upload to s3 bucket in supabase, but everything is new and complicated right now so i want to get the app working, <br>
and then later work on optimisations and scaling.<br><br>
I've set myself a deadline to complete certain things by 21/6, so i have 16 days to finish General app layout (which is just colour) as well as start doing Project pages<br>
Ill need to do project pages before i can start any other page (home, schedule, ...) because they rely on data input into project<br>
Fun stuff fr.
### - 09/05/24 -
Made it possible to invite people to my project using a link, will do send email later cause why not, <br>
I also changed the side nav to show projects that are shared with current user, it also has a badge saying user role, <br>
This required me to play around with typescript types and I learnt a bit more about them, very interesting, <br>
With project pages and headers receiveing members and role props, i'll be able to do role based actions, <br>
i already started with Admins and Mods being able to invite only <br>
Next up, I'll do more project management options such as deleting project, managing users, leaving for guests ... and then Ill do navigation for different views in project page, Task table, notepad, kanban, roadmap. <br>
Might look to refactor some code, mayhaps, hmmm, ...
### - 10/06/24 - 
Finished deleting projects, leaving projects (depending on role), i also did navigation to different views in the project which took more time than i wanted it to<br>
ITS OK DOE, we learnt, which means we Up (yippie), going to style the header navigation, immma need to show some screenshots of the application, <br>
i think it looks good in light mode, and then pretty bad in dark mode, probably something to do with the colours, ill fix and see if its fit for showing <br>
In 5 days, it'll hit a month ive been doing this, if anyone cares. tbh i dont expect anyone to read this log, i need to dump thoughts out somewhere :3
### - 24/06/24 -
![image](https://github.com/MaksPikul/Planner_WebApp_Project/assets/128612499/29d9400b-5bea-4872-aa9f-ff1e193aa599)
a preview of what im working on, not finished,
sort, filter may not be added, i have other stuff i want to work on like data pipe lines and aws, <br>
kanban and notepad wont be added, same reason, Roadmap will be a drawer component which slides from the bottom, <br>
the side nav moves fyi,  <br>
colours and style need to be more "serious" and for work, too many curves,  <br>
socials will be a sidenav on the right, <br>
home will contain the schedule,  <br>,
been working on this for a month and 9 days, i want to wrap up the table, so there will be less features, <br>
reason for this is because i want to start learning messaging and real time data editing, not just work on CRUD operations in the table <br>
i need to calm my abmitions, cause i want to make something big in so little time, <br>
When Table is closer to finishing, or finished, ill take a video of everything so far and paste it here



<br><br>
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.










