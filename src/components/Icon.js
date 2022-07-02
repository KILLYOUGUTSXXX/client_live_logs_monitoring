import * as GrommetIcons from 'grommet-icons'

const selectedIcons = Object.getOwnPropertyNames(GrommetIcons)

export default function ({ type = '', ...otherProps }) {
  try {
    if(selectedIcons.indexOf(type) === -1) throw new Error()
    
    const Icon = GrommetIcons[type]

    return <Icon {...otherProps} />
  } catch (er) {
    console.error('Type icon is not found.')
    return <GrommetIcons.Help {...otherProps} />
  }
}