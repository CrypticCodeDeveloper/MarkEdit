
const defaultWrite = `# 🖋️ MarkDown Editor📜
## Developed By Abraham Bishop 👨‍💻

🔗 [LinkedIn](https://www.linkedin.com/in/abraham-bishop) 🔗[Github](https://github.com/CrypticCodeDeveloper)

## I am a Full-Stack Developer 👑
My coding journey began in 2020 when I was just 13 years old. Although my journey started inconsistently, I am grateful for the early start. Over the years, I have developed numerous projects, many of which I initially discarded, thinking they weren't worthy of showcasing. However, I've learned that every project, no matter how small, holds value and can contribute to growth.
===
Many people often ask if it's too late to start coding. The truth is, while the best time to start might have been 7 years ago, the second best time is right now. If you're curious to learn more about me and my work, feel free to check out my LinkedIn and GitHub profiles.

## ⚒️ My Tech Stack
### FrontEnd 🔮

- HTML
- CSS
- TailwindCSS
- React.js

### BackEnd ⚙️
- MongoDB
- Node.js
- Express.js
- Firebase

### Others ⚔️
- Git and Github
- Postman
`

// Function to convert Markdown to HTML
function markdownToHtml(markdown) {
    // Convert headers
    let html = markdown
        .replace(/###### (.*)/g, '<h6>$1</h6>')
        .replace(/##### (.*)/g, '<h5>$1</h5>')
        .replace(/#### (.*)/g, '<h4>$1</h4>')
        .replace(/### (.*)/g, '<h3>$1</h3>')
        .replace(/## (.*)/g, '<h2>$1</h2>')
        .replace(/# (.*)/g, '<h1>$1</h1>');

    // Convert bold and italic
    html = html
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
        .replace(/\*(.*?)\*/g, '<em>$1</em>')          // Italic
        .replace(/\_(.*?)\_/g, '<u>$1</u>') //underline
        .replace(/\-(.*?)\-/g, '<s>$1</s>'); //strike-through
    // Convert unordered lists
    html = html
        .replace(/^\s*[-*] (.*)/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');

     // Convert links
     html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'); // Links

    // Convert ordered lists
    html = html
        // Match lines starting with a number and a period, convert them into <li> tags
            .replace(/^\s*\d+\. (.*)/gm, '<li>$1</li>')
            // Surround <li> items with <ul> tags
            .replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>')
            // Replace *** with a line break or empty line
            .replace(/\=\=\=/g, '<br><br>');

    return html;
}


document.addEventListener("DOMContentLoaded",()=>{

    // Initialize variables and DOM elements
    const editor = document.getElementById('editor')
    const preview = document.getElementById('preview')

    // Set default markdown and update preview view 1st time on page load
    editor.value = defaultWrite;
    preview.innerHTML = markdownToHtml(editor.value);

    // Function to wrap the selected text in markdown syntax
    const wrapSelectedText = (syntaxBegin,syntaxEnd) => {
            // get the start and end of the selected text
            const startSelection = editor.selectionStart
            const selectionEnd = editor.selectionEnd

            // get the current text before and after the selected text
            const textBefore = editor.value.substring(0, startSelection)
            const selectedText = editor.value.substring(startSelection, selectionEnd)
            const textAfter = editor.value.substring(selectionEnd)

            // modify the selected text
            const modifiedText = textBefore + syntaxBegin + selectedText + syntaxEnd + textAfter

            editor.value = modifiedText;
            preview.innerHTML = markdownToHtml(editor.value)
    }

    // function to update the preview in real time
    editor.addEventListener("input",()=>{
        preview.innerHTML = markdownToHtml(editor.value)
    })

    // Event listener for the italics button
    document.getElementById('italics').addEventListener("click", () => {
        wrapSelectedText("*","*")
    });

    // Event listerner for the bold button
    document.getElementById('bold').addEventListener("click", () => {
        wrapSelectedText("**", "**")
    });

    // Event listener for the underline button
    document.getElementById('underline').addEventListener("click", () => {
        wrapSelectedText("_", "_")
    });

    // Event listener for the strikethrough button
    document.getElementById('strike-through').addEventListener("click", () => {
        wrapSelectedText("-", "-")
    });

    // Event listener for the link button
    document.getElementById('anchor').addEventListener("click", () => {
        wrapSelectedText('[','](https://)')
    });

    document.getElementById('break').addEventListener("click", () => {
        wrapSelectedText("===", "")
    })

    document.getElementById('list').addEventListener("click", () => {
        wrapSelectedText("- ", "")
    })

    document.getElementById('heading-1').addEventListener("click", () => {
        wrapSelectedText("# ", "")
    })
    document.getElementById('heading-2').addEventListener("click", () => {
        wrapSelectedText("## ", "")
    })
    document.getElementById('heading-3').addEventListener("click", () => {
        wrapSelectedText("### ", "")
    })
    document.getElementById('heading-4').addEventListener("click", () => {
        wrapSelectedText("#### ", "")
    })
    document.getElementById('heading-5').addEventListener("click", () => {
        wrapSelectedText("##### ", "")
    })
    document.getElementById('heading-6').addEventListener("click", () => {
        wrapSelectedText("###### ", "")
    })

})
