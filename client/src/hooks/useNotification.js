import { store } from 'react-notifications-component';
export function useSuccesNotification({ title, message }) {
	store.addNotification({
		title,
		message: message,
		type: 'success',
		insert: 'bottom',
		container: 'bottom-left',
		animationIn: [ 'animated', 'fadeIn' ],
		animationOut: [ 'animated', 'fadeOut' ],
		dismiss: {
			duration: 2000,
			onScreen: true
		}
	});
}

export function useErrorNotification({ title, message }) {
	store.addNotification({
		title,
		message: message,
		type: 'error',
		insert: 'bottom',
		container: 'bottom-left',
		animationIn: [ 'animated', 'fadeIn' ],
		animationOut: [ 'animated', 'fadeOut' ],
		dismiss: {
			duration: 2000,
			onScreen: true
		}
	});
}
