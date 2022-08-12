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
    <footer className="footer">
      <Icon path={mdiGithub} size={1.5} color="white" />
      <Icon path={mdiMailboxOutline} size={1.5} color="white" />
      <Icon path={mdiCodepen} size={1.5} color="white" />
      <Icon path={mdiRss} size={1.5} color="white" />
      <Icon path={mdiWeb} size={1.5} color="white" />
      <p>| bfox © 2022</p>
    </footer>
  )
}

export default Footer
