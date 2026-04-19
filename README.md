# Pet-GoToPro — Your Complete Launch Guide

Welcome to your new website. This README is the single document that will take you from the folder of files you just downloaded all the way to a live, running website at pet-gotopro.com. Read it once through before you start doing anything so you understand the overall journey, then return to each section as you reach that step in the actual setup. Take your time — none of this is urgent, and rushing creates the kind of small mistakes that take hours to debug later.

## Table of Contents

1. What you have and what it does
2. Tools you need to install on your computer
3. Setting up the project on your computer
4. Previewing the site locally before you deploy
5. Creating a GitHub account and pushing your code
6. Deploying to Cloudflare Pages
7. Moving your domain nameservers to Cloudflare
8. Connecting your custom domain
9. Setting up email routing for contact@pet-gotopro.com
10. Configuring the Decap CMS admin panel
11. Setting up the contact form with Web3Forms
12. Adding the cookie consent banner
13. Submitting your site to Google Search Console
14. Applying to Amazon Associates
15. Your ongoing publishing workflow
16. Troubleshooting common problems
17. Getting help

## Chapter One: What you have and what it does

Before we start setting anything up, it helps to understand what you are looking at. Your project folder contains everything needed to run a complete affiliate content website, organized into several distinct layers that each have a specific job. Understanding these layers will make every later step feel more intuitive.

The top level of the folder contains configuration files that tell the system how to behave. The package.json file lists the software packages your site depends on, similar to a recipe's ingredient list. The astro.config.mjs file provides Astro with the specific settings your site uses, including your domain name and which features are enabled. The .gitignore file tells version control which files to skip when uploading to GitHub, keeping sensitive or unnecessary files out of your public repository.

The src folder is where all the actual site lives. Inside src you will find several subfolders that each serve a distinct purpose. The assets folder holds images and other media that get processed and optimized when the site builds. The components folder would hold reusable UI building blocks if we needed any beyond what the layout provides. The content folder is where your articles live as Markdown files, organized into reviews, guides, news, and authors. The layouts folder contains the master template that wraps every page with your header, footer, and metadata. The pages folder defines every URL on your site — each file here becomes a page, and special filenames with square brackets generate multiple pages automatically from your content. The styles folder contains the global CSS that defines your visual design system.

The public folder holds files that get served exactly as-is without any processing. This is where your logo image lives, your favicon, your robots.txt file, and the admin panel files for Decap CMS.

When you run the build process, Astro reads all of these files, processes your Markdown content through the templates, optimizes your images, generates search-friendly HTML for every page, creates a sitemap, and outputs everything into a dist folder containing the finished website ready to upload to any web host.

## Chapter Two: Tools you need to install on your computer

Before you can do anything else, you need two pieces of software installed on your computer. Both are free, trusted, and take less than ten minutes to install. Do not skip these steps — they are prerequisites for everything else.

The first tool is Node.js, which is the software that runs Astro and all its dependencies. Go to nodejs.org and download the LTS version, which stands for Long Term Support and is the most stable release. The installer is straightforward on both Windows and Mac. Run the installer with all default settings, and when it finishes, you will have Node.js available to use from the command line. To verify the installation worked, open a terminal window — Terminal on Mac or PowerShell on Windows — and type `node --version` and press Enter. You should see a version number starting with v20 or v22 printed back to you. If you see that, Node.js is installed correctly.

The second tool is Git, which is version control software that GitHub uses to track changes to your project. Visit git-scm.com/downloads and install the appropriate version for your operating system. Again, run through the installer with default settings. After installation, verify Git is working by typing `git --version` in your terminal. You should see a version number printed back.

If you are on Windows and you want a friendlier interface than the command line for working with Git, you can optionally install GitHub Desktop from desktop.github.com. It provides a point-and-click interface for most Git operations. The command line is faster once you learn it, but GitHub Desktop is genuinely easier to learn when you are starting out.

One more thing worth installing, though not strictly required, is a good code editor. Visual Studio Code is free and excellent for editing Markdown and code files. Download it from code.visualstudio.com. When you open your project folder in VS Code, you get syntax highlighting, file search, and a built-in terminal that saves you from constantly switching between windows.

## Chapter Three: Setting up the project on your computer

Now that you have the tools installed, let us get the project running on your computer. Open a terminal window and navigate to wherever you want to keep the project folder. A common choice is your Documents folder or a dedicated code folder in your home directory. You can navigate using the `cd` command, short for "change directory." For example, typing `cd Documents` on most systems will move you into your Documents folder.

Once you are in the location where you want the project, unzip the project archive if you have not already. You should end up with a folder called pet-gotopro containing all the files we have been building. Navigate into that folder with `cd pet-gotopro`.

The next step installs all the software dependencies your project needs. Type `npm install` and press Enter. This tells your system to read the package.json file and download every package it lists, plus all the packages those packages depend on. The process takes anywhere from one to five minutes depending on your internet connection, and you will see a lot of scrolling text as different packages install. You may see a few warnings about deprecated packages — this is normal and safe to ignore unless you see actual error messages. When the process finishes, you will have a new folder called node_modules containing hundreds of subfolders of downloaded code. Do not edit anything inside node_modules manually. It exists to be read by Astro, not modified by you.

At this point, your project is ready to run. But before you do anything else, you should commit the current state to Git so you have a snapshot to return to if something goes wrong later. From the project folder, type `git init` to initialize a new Git repository, then `git add .` to stage all the current files, and `git commit -m "Initial project setup"` to save the snapshot. You now have a version-controlled project.

## Chapter Four: Previewing the site locally before you deploy

One of the joys of working with Astro is that you can run the entire site on your own computer before putting it on the internet. This lets you see your changes instantly as you make them, without waiting for deployment cycles. From your project folder, type `npm run dev` and press Enter. After a few seconds of startup messages, you will see a line saying "Local: http://localhost:4321" or similar. Open that URL in your browser.

You should see your Pet-GoToPro homepage rendering with the logo in the header, the pet category grid, and the recent posts including the self-cleaning litter boxes review. Click around. Visit the Reviews hub, click into Cats, click into the litter box article. Visit the Guides section. Try the About page, the Contact page, and the legal pages. If everything works, you have just confirmed that your site builds and renders correctly. This is a significant milestone.

The development server watches your files for changes and automatically reloads the page when you edit something. Try opening src/consts.js in your code editor and changing the tagline value, then saving. Watch your browser — the page updates within a second to show the new tagline. This instant feedback loop is how you will work when adding new content or tweaking designs in the future.

To stop the development server, return to your terminal and press Ctrl+C. The server shuts down and returns you to the command prompt.

If something goes wrong and the site does not render correctly, check the terminal for error messages. Astro is very good at telling you exactly what file has a problem and what the problem is. The most common error at this stage is a typo in a Markdown file's frontmatter, like a missing required field. Fix whatever Astro reports, save, and the site will reload automatically.

## Chapter Five: Creating a GitHub account and pushing your code

For your site to go live on Cloudflare Pages, it needs to live in a GitHub repository. GitHub is a free service that hosts code, and Cloudflare reads your code from GitHub to build and deploy your site. If you do not already have a GitHub account, go to github.com and sign up. The free tier is plenty for what you need.

Once you have an account, create a new repository. Click the plus icon in the top right of GitHub and select New Repository. Name it pet-gotopro. Leave it as public if you are comfortable with that, or make it private if you prefer — either works for your purposes. Do not initialize the repository with a README, license, or gitignore since you already have those files locally. Click Create Repository.

GitHub will now show you a page with instructions for uploading an existing project. The relevant commands look something like this:

```
git remote add origin https://github.com/YOUR-USERNAME/pet-gotopro.git
git branch -M main
git push -u origin main
```

Replace YOUR-USERNAME with your actual GitHub username, then run those three commands one at a time in your terminal from inside the project folder. GitHub may prompt you for credentials. The first time, you may need to create what is called a personal access token to authenticate, which GitHub's documentation walks you through step by step. Once the push succeeds, refresh the GitHub page and you will see your project files now living there.

If you prefer a graphical interface, GitHub Desktop will handle all of this with point-and-click menus. Install it from desktop.github.com, log in with your GitHub account, choose "Add an Existing Repository from your Hard Drive," point it at your pet-gotopro folder, and use the "Publish Repository" button.

## Chapter Six: Deploying to Cloudflare Pages

Your code is on GitHub. Now we tell Cloudflare to turn it into a live website. Go to dash.cloudflare.com and sign up for a free Cloudflare account if you do not have one. The free tier includes unlimited bandwidth for static sites, which is exactly what you need.

Once logged in, find Workers and Pages in the left sidebar and click it. Click the Create button, then select Pages, then click Connect to Git. Cloudflare will ask for permission to access your GitHub repositories — authorize it and select the pet-gotopro repository from the list.

On the next screen, Cloudflare asks about build settings. For framework preset, select Astro from the dropdown. Cloudflare will auto-fill the build command as `npm run build` and the output directory as `dist`. These are correct — do not change them. Click Save and Deploy.

Cloudflare now runs through the build process for the first time, which takes anywhere from one to three minutes. You can watch the build log scroll by in real time. When it finishes, you will see a success message and a URL that looks like pet-gotopro.pages.dev. Click that URL — congratulations, your site is now live on the internet.

Going forward, every time you push changes to the main branch of your GitHub repository, Cloudflare automatically rebuilds and redeploys your site. You do not have to touch the Cloudflare dashboard for routine updates. If you want to preview changes before they go live, push them to a different branch instead of main, and Cloudflare will create a preview URL for that branch without affecting the production site.

## Chapter Seven: Moving your domain nameservers to Cloudflare

Right now your site is live at a pages.dev URL. To make it available at pet-gotopro.com, you need to point your domain at Cloudflare. This involves changing what are called nameservers, which are the computers that tell the internet where to find your domain.

From the Cloudflare dashboard, click the plus icon near the top right and choose Add a Site. Enter pet-gotopro.com and click Continue. Cloudflare will scan for any existing DNS records on your domain — most likely it will find none, since your domain is new. Choose the Free plan and click Continue.

Cloudflare now shows you two nameserver values that look like alice.ns.cloudflare.com and bob.ns.cloudflare.com, though the actual names will be different. Copy both of these values to a text editor for reference.

Now log into your Square account at squareup.com. Navigate to Online, then Domains, then find pet-gotopro.com and click Manage. Look for a nameserver or DNS settings section. Square uses a partner registrar called Register.com behind the scenes, but the interface should still let you change nameservers. Replace the existing Square nameservers with the two Cloudflare values you copied. Save the changes.

Propagation, meaning the change spreading across the global internet, typically completes within fifteen minutes to four hours. Square warns it can take up to forty-eight hours in worst-case scenarios, but in practice it is usually much faster. You can return to the Cloudflare dashboard during this time to see when Cloudflare detects that the nameservers have been updated — it will show a clear success message.

## Chapter Eight: Connecting your custom domain

Once Cloudflare is managing your domain's DNS, you can point pet-gotopro.com at your Pages site. From the Cloudflare dashboard, navigate to Workers and Pages, click into your pet-gotopro project, and find the Custom Domains tab. Click Set Up a Custom Domain and enter pet-gotopro.com. Cloudflare will automatically create the necessary DNS records and activate the domain. Repeat the process for www.pet-gotopro.com so both versions of the URL work.

Next go to SSL/TLS in the left sidebar of your Cloudflare zone (which you reach by clicking pet-gotopro.com under Websites on the main dashboard). In the Overview section, make sure encryption is set to Full (strict). This ensures all traffic between your visitors and your site is encrypted, and that Cloudflare requires a valid SSL certificate on both ends.

SSL certificates are usually issued automatically within fifteen minutes of setting up the custom domain. You can verify everything is working by visiting pet-gotopro.com in your browser. You should see your site load with a padlock icon in the URL bar indicating the connection is secure.

As a final polish, you probably want requests to www.pet-gotopro.com to redirect to pet-gotopro.com so search engines do not see both as separate sites. In your Cloudflare zone, find Rules in the left sidebar, then Redirect Rules, then Create Rule. Set the condition so that when hostname equals www.pet-gotopro.com, redirect dynamically to `concat("https://pet-gotopro.com", http.request.uri.path)` with a 301 status code. Save the rule. Now visiting www.pet-gotopro.com forwards visitors to the apex domain.

## Chapter Nine: Setting up email routing for contact@pet-gotopro.com

You need a professional email address at your domain, and Cloudflare provides one for free. In your Cloudflare zone for pet-gotopro.com, find Email in the left sidebar and click Email Routing. Click Get Started.

Cloudflare will walk you through a short setup flow. First, it asks for a destination email where forwarded messages should land — enter your personal Gmail or other existing email address. Cloudflare sends a verification email to that address; click the link inside to confirm you own it.

Next, Cloudflare wants to add the necessary MX and SPF records to your DNS. Click the "Add records and enable" button and it handles everything automatically. Do not edit those records manually after they are created.

Now go to Routing Rules and then Custom Addresses. Click Create Address. For the address, type contact and select your verified destination email. Save. Now any email sent to contact@pet-gotopro.com will forward automatically to your personal inbox.

I also recommend adding a catch-all rule so that emails to any address at your domain, including typos, get forwarded. In the Catch-All section, enable it and set the action to forward to your verified destination. This prevents important emails from being lost if someone slightly misspells your contact address.

Test by sending an email from a different account to contact@pet-gotopro.com. The message should arrive in your inbox within a minute or two. If it does, email routing is working correctly.

## Chapter Ten: Configuring the Decap CMS admin panel

Your site has an admin panel at pet-gotopro.com/admin that lets you write and publish posts through a web form instead of editing files. Setting it up requires one configuration change and a short authentication setup.

First, open public/admin/config.yml in your code editor. Find the line that reads `repo: YOUR-GITHUB-USERNAME/pet-gotopro` and replace YOUR-GITHUB-USERNAME with your actual GitHub username. Save the file, then commit and push the change to GitHub so Cloudflare rebuilds the site with the correction.

Next, you need to set up the authentication that lets Decap commit content to your GitHub repository. Decap uses OAuth, which is a secure way for one service to access another service on your behalf. For free authentication, sign up for a free Netlify account at netlify.com. You do not need to host anything on Netlify — you only need the free OAuth service.

Inside your Netlify account settings, go to OAuth Applications and click Install Provider. Select GitHub as the provider. Netlify walks you through authorizing it. Once authorized, Netlify gives you the authentication URL your Decap admin will use. Decap is preconfigured to work with Netlify's OAuth by default, so you do not need to change anything else in the config file.

Visit pet-gotopro.com/admin. You should see a Decap login screen with a "Login with GitHub" button. Click it, authorize Decap, and you will land in the admin dashboard. From here you can create, edit, and publish posts through a friendly web form.

When you publish a post through the admin, Decap commits the resulting Markdown file to your GitHub repository, Cloudflare detects the push, and your site rebuilds automatically. The entire cycle from clicking Publish to your post being live typically takes sixty to ninety seconds.

## Chapter Eleven: Setting up the contact form with Web3Forms

The contact page has a form ready to go, but it needs an access key to actually receive submissions. Web3Forms is a free service that handles form submissions without requiring any backend code.

Go to web3forms.com and enter your contact@pet-gotopro.com email address. The service emails you an access key almost immediately. Copy that key.

Open src/pages/contact.astro in your code editor. Find the line that reads `value="YOUR_ACCESS_KEY_HERE"` and replace YOUR_ACCESS_KEY_HERE with the key you received. Save the file, commit, and push to GitHub. Cloudflare rebuilds the site, and your contact form is now live.

Test it by submitting a message through the form. The message should arrive in your inbox within a minute. If it does not, double-check that the access key was pasted exactly as provided, with no extra spaces.

Web3Forms' free tier handles 250 submissions per month, which is ample for a new site. If you ever exceed that, paid tiers are available for a few dollars a month.

## Chapter Twelve: Adding the cookie consent banner

If you have visitors from the European Union or California, you are required by law to show a cookie consent banner. The good news is that Pet-GoToPro uses so few cookies that the banner can be configured very simply.

Sign up for a free CookieYes account at cookieyes.com. The free tier handles 15,000 pageviews per month, which is plenty for a new site. During signup, enter pet-gotopro.com as your domain.

Follow CookieYes's configuration wizard. When it asks about the types of cookies your site uses, the honest answer is that you use almost none — only affiliate attribution cookies from retailers when visitors click your affiliate links, and potentially some cookies from embedded content like YouTube videos if you ever embed any. Select the options that match that configuration.

After configuration, CookieYes gives you a small JavaScript snippet to add to your site. Open src/layouts/BaseLayout.astro and paste the snippet just before the closing `</head>` tag. Save, commit, and push. The banner now appears on every page for first-time visitors and respects their choice on subsequent visits.

Verify everything works by opening your site in a private browsing window. You should see the banner, be able to accept or reject cookies, and see the banner disappear after making your choice.

## Chapter Thirteen: Submitting your site to Google Search Console

For your site to show up in Google search results, Google needs to know it exists. Search Console is Google's free tool for site owners that also provides valuable data about how your site performs in search.

Go to search.google.com/search-console and add a new property. Choose "Domain" verification and enter pet-gotopro.com. Google gives you a TXT record to add to your DNS for verification.

In your Cloudflare zone for pet-gotopro.com, go to DNS, click Add Record, select TXT type, and paste the verification value Google provided. Save, then return to Search Console and click Verify. Verification should complete within a minute or two.

Once verified, submit your sitemap. In Search Console, find Sitemaps in the left sidebar, and add a new sitemap with the URL sitemap-index.xml. Google will crawl your sitemap over the coming days and begin indexing your pages.

Search Console takes several weeks to accumulate useful data about your site, so do not expect immediate insights. Check back weekly to see how many pages Google has indexed, which queries are bringing visitors to your site, and whether any technical issues need attention.

## Chapter Fourteen: Applying to Amazon Associates

Before you apply to Amazon Associates, make sure your site meets the requirements the research phase identified. Specifically, ensure you have at least ten substantive published articles, all legal pages are live and linked in the footer, your affiliate disclosure is visible in the footer and above any affiliate links, and your contact page works. Applying before these are in place commonly results in a rejection, and rejected applications cannot be appealed under the same details.

When ready, go to affiliate-program.amazon.com and click Sign Up. Follow the application process, listing pet-gotopro.com as your primary traffic source. Critically, list every other traffic source you plan to use — every social media handle, every other website — in the account settings. Undisclosed traffic sources is the most common reason Amazon closes affiliate accounts, and the damage is typically permanent.

Once approved, Amazon gives you a conditional account. To fully activate, you need to generate three qualifying non-household sales within 180 days of approval. A qualifying sale is a purchase through your affiliate link by someone who is not a member of your household. Focus on publishing substantive reviews during this window — the content that typically drives first sales is in-depth reviews of products in popular categories where visitors are actively comparing options.

Your affiliate tag bizco057-20 is already configured throughout the site, so once your account is active, every link on the site immediately becomes monetized.

## Chapter Fifteen: Your ongoing publishing workflow

With everything set up, your day-to-day publishing workflow becomes remarkably simple. To add a new review, visit pet-gotopro.com/admin and log in. Click Product Reviews, then New Review. Fill out the form with your title, description, pet category, hero image, and article body. The body field uses a simple rich-text editor that handles Markdown formatting for you. Click Publish when ready.

Behind the scenes, Decap commits your new Markdown file to GitHub, Cloudflare detects the commit, and your site rebuilds with the new post. Within sixty to ninety seconds, the post is live on pet-gotopro.com and properly categorized.

Updating an existing post works the same way — open the post in the admin, make your edits, and publish. The rebuild is automatic.

For more technical changes like tweaking the design or adding new pages, edit the files directly on your computer and push to GitHub. Cloudflare rebuilds the same way it does for content changes.

If you ever break something with a change, Cloudflare lets you roll back to any previous deployment with a single click. Navigate to your Pages project in the Cloudflare dashboard, find the deployment history, and choose Retry Deployment on any previous successful build.

## Chapter Sixteen: Troubleshooting common problems

Most problems you encounter will fall into a few recognizable categories, and knowing how to diagnose them will save you hours of frustration.

If the site builds locally but fails to build on Cloudflare, the issue is usually one of three things. Check the build log in the Cloudflare dashboard for the exact error message. The most common cause is a typo in a Markdown file's frontmatter, like a missing required field or a date in the wrong format. Fix the file, commit, push, and the build will retry. The second common cause is that you forgot to commit a file before pushing, so Cloudflare cannot find something the code references. Run `git status` in your terminal to see uncommitted files. The third is that a dependency version got out of sync — rare, but fixable by deleting node_modules and running npm install again.

If images are not showing up, the most likely cause is that the file path in the frontmatter does not match the actual location of the image. Astro is strict about paths. Image references in Markdown frontmatter should be relative paths from the Markdown file's location to the image file's location. If your Markdown file is at src/content/reviews/cats/my-article.md and the image is at src/content/reviews/cats/images/photo.jpg, the reference in frontmatter should be ./images/photo.jpg.

If Decap admin cannot save changes, the authentication between Decap and GitHub has likely lapsed. Log out of the admin and log back in. If that does not work, check that your Netlify OAuth application is still connected by going to Netlify settings and re-authorizing GitHub if needed.

If your custom domain shows an SSL error, the certificate has not yet been issued. Wait fifteen minutes and try again. If the error persists after an hour, check that your DNS records are pointing correctly in the Cloudflare dashboard and that SSL is set to Full (strict) mode.

## Chapter Seventeen: Getting help

Every tool mentioned in this guide has excellent documentation available online. When you get stuck, searching for the exact error message or the specific task you are trying to accomplish is usually the fastest path to a solution.

Astro documentation is at docs.astro.build and is among the best-written technical documentation I have ever encountered. Cloudflare Pages documentation is at developers.cloudflare.com/pages. Decap CMS documentation is at decapcms.org/docs. GitHub has extensive guides at docs.github.com covering both repository management and GitHub Desktop.

The communities around these tools are also helpful. Astro has an active Discord server linked from their website. Cloudflare has a community forum. Stack Overflow answers most specific technical questions. Claude, the AI assistant you have been working with, can also help you debug specific issues if you describe what you are trying to do and what is happening instead.

As you publish more content and your site grows, consider these ongoing improvement areas. Core Web Vitals testing through Google PageSpeed Insights will tell you how fast your site loads from a real-user perspective. Google Search Console's performance data will reveal which queries are driving traffic and which pages could use stronger optimization. The MailerLite free tier lets you collect and email a newsletter list, which tends to be a more durable traffic channel than SEO alone. And most importantly, continue publishing. The sites that succeed in affiliate content are the ones that consistently add new articles month over month — consistency matters more than any single optimization.

Welcome to running your own website. The first few days of setup are the steepest learning curve. After that, the rhythm of writing, publishing, and refining becomes genuinely enjoyable. Good luck with Pet-GoToPro.
