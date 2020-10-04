<template>
  <div class="about">
    <div>
      <h1 id="welcome-to-assistive-input-recorder">
        Welcome to Assistive Input Recorder
      </h1>
      <p>
        Hi! I am glad that <strong>you</strong> are here. I hope you will have
        some <strong>fun</strong> while testing the input devices provided by
        the
        <a href="https://www.technikum-wien.at/" target="_blank"
          >FH Technikum Wien</a
        >.
      </p>

      <h1 id="using-the-app">Using the app</h1>

      <p>
        This app was made to help you, even if it means just a little bit. So
        let’s take a tour of this site.
      </p>
      <h2 id="record">Record</h2>
      <hr />

      <p>
        <a href="https://donaldgjeloshi.github.io/recorder-public/#/record"
          >Record Page</a
        >
        shows some different <strong>scenes</strong> that you could test
        yourself.
      </p>
      <blockquote>
        <p style="color: gray">
          For example the first scene is there to help you get more familiar
          with
          <a href="https://www.google.com/" target="_blank"
            ><strong>GOOGLE</strong></a
          ><strong> Search</strong>.
        </p>
      </blockquote>
      <p>
        The idea of these scenes is that while you are having a real scenario
        usage, the care givers in background could check your progress by
        replaying the recording.<br />
        Let’s go to the next page!
      </p>
      <h2 id="replay1">Replay</h2>
      <hr />

      <p>
        <a href="https://donaldgjeloshi.github.io/recorder-public/#/replay"
          >Replay Page</a
        >
        structures the recordings taken by you into three
        <strong>scenes</strong>. Here are the options: <em>to play</em>,
        <em>download</em> or <em>delete</em> the scene.<br />
        Let’s explain the colors that one sees by hitting the
        <strong>"Play" </strong>button and <strong>"Start"</strong> the
        replaying. In the drawings you will see different colors which represent
        the mouse speed:
      </p>

      <table style="width:50%">
        <tr>
          <th>red</th>
          <th>orange</th>
          <th>yellow</th>
          <th>green</th>
        </tr>
        <tr>
          <td>very fast</td>
          <td>fast</td>
          <td>medium</td>
          <td>slow</td>
        </tr>
      </table>

      <p>
        In the replaying scene the time that took the user to perform the task
        and the number of characters typed, can be seen. And the speed could be
        measured in character per second (CPS). In this way this metric will be
        used to measure the users' performance.
      </p>
      <h2 id="upload">Upload</h2>
      <hr />

      <p>
        <a href="https://donaldgjeloshi.github.io/recorder-public/#/upload"
          >Upload Page</a
        >
        would be most of the time for the care givers but if you, as a user
        would like to test this feature, you are more than welcome to do so.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
};
</script>

<style lang="stylus" scoped>
table, th, td
  border: 0.5px solid black
  border-collapse: collapse
</style>
