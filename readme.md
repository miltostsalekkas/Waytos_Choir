# Social Mic Example  Master

## Installation for Collaborators   Miltos


1.First create a Local Folder somehwere in your PC

  1. `cd C:\somewhere`
  2. `mkdir SocialMic`
  3. `cd C:\somewhere\SocialMic`

2.Clone the repo into your local files

`git clone https://github.com/miltostsalekkas/ServerTest.git`
`cd ServerTest`

3.Adding Branches to keep the master Deployable

>> _if you want to work on how to stream the microphone data for example you should create a branch called Streaming_Microphone :_

4.Create Branch

`git checkout -b Streaming_Microphone`

“co” is short for “checkout” which is used to switch between branches. Adding the “-b” and a name at the end creates a new branch and then moves into that new branch for us.
You should be able to verify this with the command:

5.Finalise branch

`git branch`

6.Commit changes

Note: As a general rule, you should git add frequently and git commit when you finish something that allows your code to work (ends up being a couple times an hour). For example, when you finish a method and the code base works, git commit like so:

`git commit -m "Added function to allow Users to say 'Hello World'"`

7.Next, have everyone git push their branches:

`git push origin Streaming_Microphone`
