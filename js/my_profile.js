const BASE_URL = "http://146.56.183.55:5050";

checkLoginUser();
// - top-bar, 헤더 바

// - 관련 변수들 -
const btnBack = document.querySelector(".button-back");
const btnMore = document.querySelector(".button-more");
const backgroundUpModal = document.querySelector(".background_up-modal");
const upModal = document.querySelector(".up-modal");
const postItemList = document.querySelectorAll(".item-modal");
const logoutBtn_up = Array.from(postItemList).find(
    (item) => item.innerText === "로그아웃"
); // ※ find를 쓰기 위해선 nodeList > Array 변환 이 필요
const backgroundPopupModal = document.querySelector(".background_popup-modal");
const popupModal = document.querySelector(".popup-modal");
const cancelBtn_popup = document.querySelector(".cancel-button_popup");
const logoutBtn_popup = document.querySelector(".action-button_popup");

// - 뒤로가기 버튼
btnBack.addEventListener("click", () => {
    // 채팅방 뒤로가기 작성하고 작성팀원분들과 얘기하고 작성하기
    history.back();
    // location.href("");
});

// - 더보기 버튼 & up modal, 위로 올라오는 모달
btnMore.addEventListener("click", () => {
    backgroundUpModal.style.display = "block";
    upModal.style.bottom = "0";
});
backgroundUpModal.addEventListener("click", () => {
    backgroundUpModal.style.display = "none";
    upModal.style.bottom = "-20rem";
});

// - popup modal, 띄워지는 모달
logoutBtn_up.addEventListener("click", () => {
    backgroundPopupModal.style.display = "block";
    popupModal.style.display = "block";
});
cancelBtn_popup.addEventListener("click", () => {
    backgroundPopupModal.style.display = "none";
    popupModal.style.display = "none";
});

// - 로그 아웃 기능
logoutBtn_popup.addEventListener("click", () => {
    localStorage.removeItem("Token");
    // localStorage.removeItem("account");
    // localStorage.removeItem("user-profile");
    location.href = "login.html";
});

// - profile-info, 프로필 정보 -

// - 관련 변수
const profileCont = document.querySelector(".cont_profile");

const profileFollowers = document.querySelector(".number_followers");
const profileFollowings = document.querySelector(".number_followings");
const profileFollowersBtn = document.querySelector(".followers_profile");
const profileFollowingsBtn = document.querySelector(".followings_profile");
const profileImg = document
    .querySelector(".header_profile")
    .querySelector("img");
const profileName = document.querySelector(".name_profile");
const profileAccount = document.querySelector(".account_profile");
const profileIntro = document.querySelector(".explain_profile");
const profileFixButton = document.querySelector(
    ".footer_profile > button:first-child"
);
const addProductButton = document.querySelector(
    ".footer_profile > button:nth-child(2)"
);

// - 프로필 데이터 fetch로 가져오기
getProfileData();

// - 페이지 이동 -
profileFollowersBtn.addEventListener("click", () => {
    const accountName = getQueryValue("accountname");
    location.href = `follow.html?accountName=${accountName}&follow=follower`;
});
profileFollowingsBtn.addEventListener("click", () => {
    const accountName = getQueryValue("accountname");
    location.href = `follow.html?accountName=${accountName}&follow=following`;
});

// 채운님께 여쭤보기 아무나 수정이 가능한건지.. 넘겨줘야할 데이터가 있는 지
// - 프로필 수정 페이지로 이동
profileFixButton.addEventListener("click", () => {
    window.location.href = "profile_modification.html";
});
// - 상품 등록 페이지로 이동
addProductButton.addEventListener("click", () => {
    window.location.href = "add_product.html";
});
// 프로필 데이터 가져오기
async function getProfileData() {
    try {
        // const myAccountName = localStorage.getItem("account");
        const myAccountName = "qweqweqwe";
        const token = localStorage.getItem("Token");

        const res = await myFetch(
            `${BASE_URL}/profile/${myAccountName}`,
            "get",
            token
        );
        let result = await res.json();
        result = result.profile;
        console.log(result);

        profileFollowers.innerText = result.followerCount;
        profileFollowings.innerText = result.followingCount;
        profileImg.src = result.image;
        profileName.innerText = result.username;
        profileAccount.innerText = `@ ${result.accountname}`;
        profileIntro.innerText = result.intro ? result.intro : "-";
    } catch (error) {
        console.log(error);
    }
}

// - cont_on-sale -

// - 관련 변수
const onSaleCont = document.querySelector(".cont_on-sale");
const onSaleList = document.querySelector(".ul_on-sale");
const onSaleFragment = document.createDocumentFragment();
// - on-sale up modal
const onSaleUpModal = document.querySelector(".on-sale");
const onSaleBtnList = document.querySelectorAll(".on-sale .item-modal");
const onSaleDeleteBtn_up = onSaleBtnList[0];
const onSaleModifyBtn_up = onSaleBtnList[1];
const onSaleLinkBtn_up = onSaleBtnList[2];
// - on-sale popup modal
const onSalePopupModal = document.querySelector(".popup-modal+.delete_on-sale");
const onSaleCancelBtn_popup = onSalePopupModal.querySelector(
    ".cancel-button_popup"
);
const onSaleDeleteBtn_popup = onSalePopupModal.querySelector(
    ".action-button_popup"
);

// 1. delete버튼 누를 시 팝업 띄워주기
//    - 팝업에서 게시물 삭제 시 onSaleDeleteBtn에서 event함수 삭제

onSaleDeleteBtn_up.addEventListener("click", () => {
    backgroundPopupModal.style.display = "block";
    onSalePopupModal.style.display = "block";
});
onSaleCancelBtn_popup.addEventListener("click", () => {
    backgroundPopupModal.style.display = "none";
    onSalePopupModal.style.display = "none";
});

// // - 로그 아웃 기능
// logoutBtn_popup.addEventListener("click", () => {
//     localStorage.removeItem("Token");
//     // localStorage.removeItem("account");
//     // localStorage.removeItem("user-profile");
//     location.href = "login.html";
// });

// 2. modify버튼 누를 시 id담아서 수정페이지로 이동하기
// 3. link 버튼 누를 시 걸려있는 페이지로 이동하기
// - popup modal, 띄워지는 모달

getOnSaleData();

// - 유저 판매 상품 데이터를 가져와서 화면에 그려주기
async function getOnSaleData() {
    try {
        // const myAccountName = localStorage.getItem("account");
        const myAccountName = "qweqweqwe";
        const token = localStorage.getItem("Token");

        const res = await myFetch(
            `${BASE_URL}/product/${myAccountName}`,
            "get",
            token,
            null
        );
        const result = await res.json();
        const productList = result.product;

        // 등록된 상품이 있을 경우만 리스트 보여주기
        if (productList.length > 0) {
            onSaleCont.style.display = "block";
        } else {
            return;
        }

        productList.forEach((product) => {
            // 가격에 ','를 달아주는 로직
            const price = makeMoneysComma(`${product.price}`);

            // 상품 노드 생성
            const productItem = document.createElement("li");
            productItem.className += "li_on-sale";
            productItem.innerHTML = `
                    <article class="item_on-sale">
                        <img src="${product.itemImage}" alt="판매상품 ${product.itemName}의 이미지">
                        <p class="tit_item">
                            ${product.itemName}
                        </p>
                        <p class="price_item">
                            <strong>
                                ${price}
                            </strong>원
                        </p>
                    </article>`;
            onSaleFragment.appendChild(productItem);

            // 상품 노드 이벤트 등록
            productItem.addEventListener("click", () => {
                backgroundUpModal.style.display = "block";
                onSaleUpModal.style.bottom = "0";
                // 일회성 이벤트 등록
                // 상품 삭제 이벤트 등록
                onSaleDeleteBtn_popup.addEventListener(
                    "click",
                    function deleteFuncWrapper() {
                        deleteItem(product.id, "onSale");
                        onSaleDeleteBtn_popup.removeEventListener(
                            "click",
                            deleteFuncWrapper
                        );
                    }
                );
                // 상품 수정 이벤트 등록
                onSaleModifyBtn_up.addEventListener(
                    "click",
                    function modifyFuncWrapper() {
                        modifyItem(product.id, "onSale");
                        onSaleModifyBtn_up.removeEventListener(
                            "click",
                            modifyFuncWrapper
                        );
                    }
                );
                // 상품 링크 이동 이벤트 등록
                onSaleLinkBtn_up.addEventListener(
                    "click",
                    function LinkFuncWrapper() {
                        moveToLink(product.link);
                        onSaleModifyBtn_up.removeEventListener(
                            "click",
                            LinkFuncWrapper
                        );
                    }
                );
            });
        });
        onSaleList.appendChild(onSaleFragment);
        backgroundUpModal.addEventListener("click", () => {
            onSaleUpModal.style.bottom = "-20rem";
        });
    } catch (error) {
        console.log(error);
    }
}

// - on-sale 이벤트 함수
async function deleteItem(itemId, itemType) {
    console.log(itemId);
    const token = localStorage.getItem("Token");

    if (itemType === "onSale") {
        // 팝업, 업 모달 다 내려주기
        backgroundPopupModal.style.display = "none";
        backgroundUpModal.style.display = "none";
        onSalePopupModal.style.display = "none";
        onSaleUpModal.style.bottom = "-20rem";

        // 상품 삭제 로직...
        const res = await myFetch(
            `${BASE_URL}/product/${itemId}`,
            "delete",
            token,
            null
        );

        const response = await res.json();

        // 상품 삭제 완료여부 알려주기
        window.alert(response.message);
        location.reload();
    } else if (itemType === "content") {
        // 팝업, 업 모달 다 내려주기
        backgroundPopupModal.style.display = "none";
        backgroundUpModal.style.display = "none";
        contentPopupModal.style.display = "none";
        contentUpModal.style.bottom = "-20rem";

        // 게시글 삭제 로직...
        const res = await myFetch(
            `${BASE_URL}/post/${itemId}`,
            "delete",
            token,
            null
        );

        const response = await res.json();

        // 게시글 삭제 완료여부 알려주기
        window.alert(response.message);
        location.reload();
    }
}
function modifyItem(itemId, itemType) {
    if (itemType === "onSale") {
        // 여쭤보고 작성하기
        location.href = `profile_modification.html?productid=${itemId}`;
    } else if (itemType === "content") {
        location.href = `upload.html?postid=${itemId}`;
    }
}
function moveToLink(productLink) {
    window.open(productLink);
}

// - cont_contents, 게시물 정보 -

// - 관련 변수
const contentsCont = document.querySelector(".cont_contents");
// - view-style 관련 변수
const viewStyleCont = document.querySelector(".cont_view-style");
const styleBtn = viewStyleCont.querySelectorAll("button");
const listStyleBtn = Array.from(styleBtn)[0];
const pictureStyleBtn = Array.from(styleBtn)[1];
// - contents 관련 변수
const userContentsCont = document.querySelector(".cont_user-contents");
const contentsList = document.querySelector(".ul_user-contents");
const contentsFragment = document.createDocumentFragment();
const contentImagesFragment = document.createDocumentFragment();
// - content up modal 관련 변수
const contentUpModal = document.querySelector(".content");
const contentBtnList = document.querySelectorAll(".content .item-modal");
const contentDeleteBtn_up = contentBtnList[0];
const contentModifyBtn_up = contentBtnList[1];
console.log(contentDeleteBtn_up, contentDeleteBtn_up);
// - content popup modal 관련 변수
const contentPopupModal = document.querySelector(
    ".popup-modal+.delete_content"
);
const contentCancelBtn_popup = contentPopupModal.querySelector(
    ".cancel-button_popup"
);
const contentDeleteBtn_popup = contentPopupModal.querySelector(
    ".action-button_popup"
);

contentDeleteBtn_up.addEventListener("click", () => {
    backgroundPopupModal.style.display = "block";
    contentPopupModal.style.display = "block";
});
contentCancelBtn_popup.addEventListener("click", () => {
    backgroundPopupModal.style.display = "none";
    contentPopupModal.style.display = "none";
});

// - contents 데이터 가져오기
getContents();

// - view-style change
// 이벤트 처리하는 경우와 ui처리에 관해서 생각해보지 않으니 일을 두번하게 된다..
listStyleBtn.addEventListener("click", () => {
    if (Array.from(listStyleBtn.classList).includes("off")) {
        if (Array.from(userContentsCont.classList).includes("picture-style")) {
            userContentsCont.classList.remove("picture-style");

            // list button 활성화
            listStyleBtn.classList.replace("off", "on");
            listStyleBtn.querySelector("img").src =
                "../src/png/icon-post-list-on.png";

            // picture button 비활성화
            pictureStyleBtn.classList.replace("on", "off");
            pictureStyleBtn.querySelector("img").src =
                "../src/png/icon-post-album-off.png";
        }
    }
});
pictureStyleBtn.addEventListener("click", () => {
    if (Array.from(pictureStyleBtn.classList).includes("off")) {
        userContentsCont.classList.add("picture-style");

        // list button 비활성화
        listStyleBtn.classList.replace("on", "off");
        listStyleBtn.querySelector("img").src =
            "../src/png/icon-post-list-off.png";

        // picture button 활성화
        pictureStyleBtn.classList.replace("off", "on");
        pictureStyleBtn.querySelector("img").src =
            "../src/png/icon-post-album-on.png";
    }
});

// 콘텐츠의 데이터를 가져와서 그려주는 함수
async function getContents() {
    // const myAccountName = localStorage.getItem("account");
    const myAccountName = "qweqweqwe";
    const token = localStorage.getItem("Token");

    const res = await myFetch(
        `${BASE_URL}/post/${myAccountName}/userpost/?limit=6`,
        "get",
        token,
        null
    );
    const result = await res.json();
    const contentsListData = result.post;
    console.log(result);
    console.log(contentsListData);

    // 등록된 게시글이 없으면 게시글란 안보이게 처리하기
    if (contentsListData.length > 0) {
        contentsCont.style.display = "block";
    } else {
        return;
    }

    const btnMoreList = [];

    // const postIdList = [];
    // 여러 비동기에 쓰이는 await를 한 번으로 묶을 수는 없을까??, class나 생성자 함수로 각 게시물들을 바꿔주면 더 좋을 것 같다.
    for (let content of contentsListData) {
        const authorImage = await validateImage(
            content.author.image,
            "profile"
        );
        const contentImage = await validateImage(content.image, "content");
        let imageHTML = "";
        if (contentImage.length === 1 && contentImage[0]) {
            imageHTML = `<img src="${contentImage[0]}" alt="post-image" class="content-img_content-info">`;
        } else if (contentImage.length > 1) {
            const arr = [];
            contentImage.forEach((image) => {
                if (image) {
                    arr.push(
                        `<img src="${image}" alt="post-image" class="content-img_slide-item">`
                    );
                }
            });
            imageHTML = `<ul class="content-img_slide">${arr.join("")}</ul>`;
        }

        // content 노드 생성
        const contentItem = document.createElement("li");
        contentItem.className += "li_user-contents";
        contentItem.innerHTML = `
        <article class="content_user-contents">
            <img src="${authorImage}" alt="${
            content.author.username
        }님의 프로필 사진" class="img_content-info" />
            <div class="desc_content-info">
                <p class="name_content-info">${content.author.username}</p>
                <p class="email_content-info">@ ${
                    content.author.accountname
                }</p>
                <p class="txt_content-info">${content.content}</p>
                <div class="cont_content-image"></div>
                ${imageHTML}
                <div class="cont_buttons">
                <button class="button-like button-noneBackground">
                <img src="./src/png/${
                    content.hearted ? "icon-heart-active.png" : "icon-heart.png"
                    // ./src/png/icon-heart.png
                }" alt="">
                </button>
                <strong>${content.heartCount}</strong>
                <button class="button-comment button-noneBackground">
                <img src="./src/png/icon-message-circle.png" alt="">
                </button>
                <strong>${content.commentCount}</strong>
                </div>
                <p class="date_content-info">${makeKoreaDate(
                    content.updatedAt
                )}</p>
            </div>
                    
        </article>`;

        // 더보기 버튼 노드 생성
        const btnMoreHTML = document.createElement("button");
        btnMoreHTML.className += "btn-more_content button-noneBackground";
        btnMoreHTML.innerHTML = `<img class="" src="src/svg/s-icon-more-vertical.svg" alt="더보기 버튼">`;
        btnMoreHTML.addEventListener("click", () => {
            backgroundUpModal.style.display = "block";
            contentUpModal.style.bottom = "0";
            // 일회성 이벤트 등록
            // 상품 삭제 이벤트 등록
            contentDeleteBtn_popup.addEventListener(
                "click",
                function deleteFuncWrapper() {
                    deleteItem(content.id, "content");
                    contentDeleteBtn_popup.removeEventListener(
                        "click",
                        deleteFuncWrapper
                    );
                }
            );
            // 상품 수정 이벤트 등록
            contentModifyBtn_up.addEventListener(
                "click",
                function modifyFuncWrapper() {
                    modifyItem(content.id, "content");
                    contentModifyBtn_up.removeEventListener(
                        "click",
                        modifyFuncWrapper
                    );
                }
            );
        });
        btnMoreList.push(btnMoreHTML);
        contentsFragment.appendChild(contentItem);
    }
    contentsList.appendChild(contentsFragment);
    const descContentInfoList = document.querySelectorAll(".desc_content-info");
    console.log(btnMoreList);
    console.log(descContentInfoList);
    Array.from(descContentInfoList).forEach((descContentInfo, index) => {
        descContentInfo.after(btnMoreList[index]);
    });
    backgroundUpModal.addEventListener("click", () => {
        contentUpModal.style.bottom = "-20rem";
    });
}

// - 이미지가 유효한 지 검사하는 함수
async function validateImage(image, imageType) {
    const token = localStorage.getItem("Token");
    // const token = AUTH;

    const imageArray = await image.split(",");
    const newArray = [];
    for (let image of imageArray) {
        newArray.push(
            await myFetch(
                image ? `${image}` : "notfoundimage",
                "get",
                token,
                null
            ).then((res) => {
                if (res === "error") {
                    if (imageType === "profile") {
                        return "../src/svg/basic-profile-img.svg";
                    } else {
                        // 이미지가 없을 경우.. 어떻게 처리할 것인가..
                        return "";
                    }
                } else {
                    return image;
                }
            })
        );
    }
    return newArray;
}

// - nav bar, 하단 탭 페이지이동 -

// - 관련 변수
const goToHome = document.querySelector(".tap-menu-home");
const goToChat = document.querySelector(".tap-menu-chat");
const goUpload = document.querySelector(".tap-menu-upload");
const goMyProfile = document.querySelector(".tap-menu-user");

// - 페이지 이동
goToHome.addEventListener("click", () => {
    window.location.href = "index.html";
});
goToChat.addEventListener("click", () => {
    window.location.href = "chat_list.html";
});
goUpload.addEventListener("click", () => {
    window.location.href = "upload.html";
});
goMyProfile.addEventListener("click", () => {
    window.location.href = "my_profile.html";
});

// - 공용으로 쓰이는 코드 -

// - fetch를 쉽게 쓸 수 있게 해주는 함수
async function myFetch(url, method, auth = "", data = "") {
    const responseData = await fetch(url, {
        method,
        headers: {
            // Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: auth ? `Bearer ${auth}` : "",
        },
        body:
            method === "get" || method === "delete"
                ? null
                : data
                ? JSON.stringify(data)
                : "",
    })
        .then((res) => {
            if (res.ok) {
                return res;
            } else {
                return "error";
            }
        })
        .catch((err) => {
            return err;
        });

    return responseData;
}

// - 페이지 들어올 때 토큰 있는 지 확인
function checkLoginUser() {
    // if (localStorage.getItem("Token") || localStorage.getItem("RefreshToken")) { }

    if (!localStorage.getItem("Token")) {
        location.href = "login.html";
    }
}

// - url에서 원하는 쿼리 값 받아오기
function getQueryValue(key) {
    const params = new URLSearchParams(location.search);
    const value = params.get(key);
    return value;
}

// - 년일월 날짜 변환 함수
function makeKoreaDate(date) {
    // "2022-01-10T09:08:38.035Z"
    const koreaDate = date.split("-").map((value) => parseInt(value));
    return `${koreaDate[0]}년 ${koreaDate[1]}월 ${koreaDate[2]}일`;
}

// - 돈에 ','을 붙여주는 함수
function makeMoneysComma(money) {
    let result = "";
    if (money.length < 4) {
        result = money;
        return result;
    }
    result = "," + money.slice(-3);
    return makeMoneysComma(money.slice(0, -3)) + result;
}
