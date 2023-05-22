import React from "react";

export function Manual() {
  return (
    <div className="max-w-[1000px] mx-auto self-stretch w-full p-5 bg-secondary">
      <div className="flex flex-col w-full h-full px-2 sm:px-5 py-5 text-muted-foreground font-semibold space-y-5">
        <section>
          <h2 className="text-4xl">
            Welcome to the User Manual for the Tutoryum!
          </h2>
          <p className="mt-5 font-normal">
            This guide will provide detailed instructions on using the various
            features and tools available in each view of the meeting.
          </p>
        </section>

        <section>
          <img
            src="ChatViewManual.png"
            alt="Chat view"
            // add border radius

            className="w-full sm:w-5/6 mx-auto my-5 rounded-3xl"
          />
          <h2 className="text-center text-2xl mb-5">Chat View</h2>
          <p>
            In the Chat View, you can communicate with another user via video
            and access several buttons for additional functionalities.
          </p>
          <ul
            className="
            p-5
            list-disc
            list-inside
            text-left
            space-y-2
            font-normal
            text-base
            text-muted-foreground
            
          "
          >
            <li>
              <strong>Remote Video:</strong> This area (1) displays the video
              stream from the remote user.
            </li>
            <li>
              <strong>Local Video:</strong> This area (2) displays your own
              video stream.
            </li>
            <li>
              <strong>Mute Self:</strong> Click this button (3) to mute your
              microphone during the conference.
            </li>
            <li>
              <strong>Close Camera:</strong> Click this button (4) to turn off
              your camera during the conference.
            </li>
            <li>
              <strong>Navigation Buttons:</strong> Use these buttons (5) to
              switch between different views, such as Chat View, Whiteboard
              View, PDF View, and Screenshare View.
            </li>
            <li>
              <strong>End Connection:</strong> Click this button (6) to end the
              conference and disconnect from the other user.
            </li>
          </ul>
        </section>

        {/* Whiteboard View */}
        <section>
          <img
            src="WhiteboardViewManual.png"
            alt="Whiteboard view"
            className="w-full sm:w-5/6 mx-auto my-5 rounded-3xl"
          />
          <h2 className="text-center text-2xl mb-5">Whiteboard View</h2>
          <p>
            You can collaborate with the other user on a shared whiteboard using
            various tools in the Whiteboard View.
          </p>
          <ul
            className="
    p-5
    list-disc
    list-inside
    text-left
    space-y-2
    font-normal
    text-base
    text-muted-foreground
  "
          >
            <li>
              <strong>Whiteboard:</strong> This area (7) displays the shared
              whiteboard. You can use tools by left-clicking on this area. Also,
              you can scale the whiteboard by scrolling and moving the
              whiteboard by right-clicking on it. While clicking the ctrl
              button, you can scroll and change the size of the whiteboard.
            </li>
            <li>
              <strong>Pen Tool:</strong> Select the Pen Tool (8) by
              left-clicking on it. You can change the size and color of the pen
              by right-clicking on it.
            </li>
            <li>
              <strong>Eraser Tool:</strong> Select the Eraser Tool (9) by
              left-clicking on it. You can change the size of the eraser by
              right-clicking on it.
            </li>
            <li>
              <strong>Text Tool:</strong> Select the Text Tool (10) by
              left-clicking on it. Right-click to change the size and color of
              the text. You can left-click anywhere on the whiteboard to add
              text.
            </li>
            <li>
              <strong>Select Tool:</strong> Select the Select Tool (11) by
              left-clicking on it. Left-click on any text or image on the
              whiteboard to scale and move the object.
            </li>
            <li>
              <strong>Image Tool:</strong> Select the Image Tool (12) by
              left-clicking on it. Choose an image from your computer and upload
              it to the whiteboard by left-clicking on the whiteboard after
              selecting the image.
            </li>
            <li>
              <strong>Download History:</strong> Click this button (13) to
              download the current history of the whiteboard.
            </li>
            <li>
              <strong>Reset Button:</strong> Click this button (14) to reset the
              whiteboard.
            </li>
          </ul>
        </section>

        {/* PDF View */}
        <section>
          <img
            src="PDFViewManual.png"
            alt="PDF view"
            className="w-full sm:w-5/6 mx-auto my-5 rounded-3xl"
          />
          <h2 className="text-center text-2xl mb-5">PDF View</h2>
          <p>
            The PDF View allows you to view and interact with uploaded PDF
            files.
          </p>
          <ul
            className="
    p-5
    list-disc
    list-inside
    text-left
    space-y-2
    font-normal
    text-base
    text-muted-foreground
  "
          >
            <li>
              <strong>PDF Container:</strong> This area (15) displays the
              current page of the uploaded PDF file.
            </li>
            <li>
              <strong>Arrow Buttons:</strong> Use these buttons (16) to navigate
              through the pages of the PDF file.
            </li>
            <li>
              <strong>Page Field:</strong> Enter a specific page number in this
              field (17) to jump directly to that page.
            </li>
            <li>
              <strong>Upload PDF:</strong> Click this button (18) to upload a
              PDF file from your local computer.
            </li>
            <li>
              <strong>Take Image:</strong> Click this button (19) to capture the
              current page of the PDF and transfer it to the Whiteboard using
              the Image Tool.
            </li>
          </ul>
        </section>

        {/* Screenshare View */}
        <section>
          <img
            src="ScreenViewManual.png"
            alt="Screenshare view"
            className="w-full sm:w-5/6 mx-auto my-5 rounded-3xl"
          />
          <h2 className="text-center text-2xl mb-5">Screenshare View</h2>
          <p>
            In the Screenshare View, you can view the shared screen of the other
            user.
          </p>
          <ul
            className="
    p-5
    list-disc
    list-inside
    text-left
    space-y-2
    font-normal
    text-base
    text-muted-foreground
  "
          >
            <li>
              <strong>Shared Screen:</strong> This area (20) displays the screen
              shared by the other user.
            </li>
            <li>
              <strong>Fullscreen Button:</strong> Click this button (21) to make
              the shared screen fullscreen on your device.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl mb-5">Closing Notes</h2>
          <p>
            We hope this user manual helps you navigate and utilize the features
            of the Tutoryum effectively. Enjoy your meetings and collaborations!
          </p>
        </section>
      </div>
    </div>
  );
}
