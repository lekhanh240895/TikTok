import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Wrapper } from './styled'
import { useDispatch } from 'react-redux'
import appSlice from '~/redux/slices/appSlice'
import { SearchIcon } from '~/components/Icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

function SearchModal() {
    const [searchValue, setSearchValue] = useState('')
    const inputRef = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleCancel = useCallback(
        () => dispatch(appSlice.actions.setIsSearchModalShow(false)),
        [dispatch]
    )

    const escFunction = useCallback(
        (event) => {
            if (event.key === 'Escape') {
                handleCancel()
            }
        },
        [handleCancel]
    )

    useEffect(() => {
        document.addEventListener('keydown', escFunction, false)

        return () => {
            document.removeEventListener('keydown', escFunction, false)
        }
    }, [escFunction])

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus()
    })

    const handleChange = (e) => {
        const searchValue = e.target.value

        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue)
        }
    }

    // Form Submit
    const handleSubmit = (e) => {
        e.preventDefault()
        navigate(`/search?q=${searchValue}`, {
            replace: true,
        })
    }

    return (
        <Wrapper className="modal" data-backdrop="false">
            <div className="modal_inner" data-backdrop="false">
                <div className="header">
                    <span
                        className="icon-wrapper-circle back-btn"
                        onClick={() => navigate(-1)}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </span>

                    <form className="search" onSubmit={handleSubmit}>
                        <input
                            placeholder="Search accounts and videos"
                            spellCheck={false}
                            type="text"
                            value={searchValue}
                            ref={inputRef}
                            onChange={handleChange}
                        />

                        <button
                            type="submit"
                            className="search-btn icon-wrapper"
                            onMouseDown={(e) => e.preventDefault()}
                            disabled={!searchValue}
                        >
                            <SearchIcon width="2.4rem" height="2.4rem" />
                        </button>
                    </form>
                </div>
            </div>
        </Wrapper>
    )
}

export default SearchModal
