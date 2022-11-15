import Icon from '@mdi/react'
import {
  mdiGithub,
  mdiCodepen,
  mdiWeb,
  mdiMailboxOutline,
  mdiRss,
} from '@mdi/js'
function Footer() {
  return (
    <footer>
      <a href="https://github.com/bafox2">
        <Icon path={mdiGithub} size={1.5} color="white" />
      </a>
      <p>| bfox © 2022</p>
    </footer>
  )
}

export default Footer
