import React from 'react'
import { TransitionGroup, Transition } from 'react-transition-group'
import { Location, Routes, useLocation, useNavigationType, NavigationType } from 'react-router-dom'
import { PAGE_TRANSITION_DURATION } from '../constants'
import { pushTask } from '../task'

type Props = {
  location: Location
  navigationType: NavigationType
  children: React.ReactNode
}

class AnimateRoutesClass extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
    this.handleEnter = this.handleEnter.bind(this)
    this.handleExit = this.handleExit.bind(this)
  }

  handleEnter(node: HTMLElement) {
    const { navigationType } = this.props

    if (navigationType === 'POP') {
      // 使用 fixed 时不能用 translate, 不然会变成 absolute
      // leftIn(node)
    } else {
      rightIn(node)
    }
  }

  handleExit(node: HTMLElement) {
    const { navigationType } = this.props

    if (navigationType === 'POP') {
      rightOut(node)
    } else {
      leftOut(node)
    }
  }

  render() {
    const { location, children } = this.props

    return (
      <TransitionGroup>
        <Transition
          key={location.pathname}
          timeout={PAGE_TRANSITION_DURATION}
          onEnter={this.handleEnter}
          onExit={this.handleExit}
        >
          <Routes location={location}>{children}</Routes>
        </Transition>
      </TransitionGroup>
    )
  }
}

function rightIn(node: HTMLElement) {
  node.style.transform = 'translateX(100%)'

  const task = () => {
    node
      .animate([{ transform: 'translateX(100%)' }, { transform: 'translateX(0)' }], {
        duration: PAGE_TRANSITION_DURATION,
        easing: 'ease',
      })
      .addEventListener('finish', () => {
        node.style.transform = ''
      })
  }

  pushTask(task)
}

function leftOut(node: HTMLElement) {
  const task = () => {
    node
      .animate([{ transform: 'translateX(0%)' }, { transform: 'translateX(-50%)' }], {
        duration: PAGE_TRANSITION_DURATION,
        easing: 'ease',
      })
      .addEventListener('finish', () => {
        node.style.display = 'none'
      })
  }
  pushTask(task)
}

function leftIn(node: HTMLElement) {
  node.style.transform = 'translateX(-50%)'

  const task = () => {
    node
      .animate([{ transform: 'translateX(-50%)' }, { transform: 'translateX(0%)' }], {
        duration: PAGE_TRANSITION_DURATION,
        easing: 'ease',
      })
      .addEventListener('finish', () => {
        node.style.transform = ''
      })
  }

  pushTask(task)
}

function rightOut(node: HTMLElement) {
  const task = () => {
    node
      .animate(
        [
          { transform: 'translateX(0%)', opacity: 1 },
          { transform: 'translateX(100%)', opacity: 0 },
        ],
        {
          duration: PAGE_TRANSITION_DURATION,
          easing: 'ease',
        }
      )
      .addEventListener('finish', () => {
        node.style.display = 'none'
      })
  }

  pushTask(task)
}

function WithRouter(Component: React.ComponentType<Props>) {
  return function RouterWrapper(props: any) {
    const location = useLocation()
    const navigationType = useNavigationType()

    return <Component location={location} navigationType={navigationType} {...props} />
  }
}

export default WithRouter(AnimateRoutesClass)
