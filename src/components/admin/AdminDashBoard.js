import React from 'react'
import Media from 'react-media'
import {Link} from "react-router";
class AdminDashBoard extends React.Component{
    render(){
        return(
            <div className="container">
                <div className="row">
                    {/*/span*/}
                    <div className="col-md-12">
                        <div className="panel panel-info">
                            <div className="panel-heading">
                                <h3 className="panel-title text-center">Profile</h3>
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                    <div className="text-center">
                                        <img alt="User Pic" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAA
                                        AAjVBMVEX///8zMzMwMDAtLS0hISErKysdHR0oKCglJSUfHx8jIyMZGRnLy8sYGBj8/Pz19fXs7OxCQkLm5ubb29vS0tKkpKTDw8OOjo7y8vI
                                        5OTk3NzdNTU25ubmdnZ1paWnh4eFWVlZdXV19fX2tra1HR0cRERG0tLSIiIhycnKSkpJbW1t4eHhkZGRvb28AAADz6EKMAAAOUUlEQVR4nO1d57aiOhQ+JDRRmoCK
                                        ig3rqPf9H++qCUhJkJIYzqz5/tx113EImyS7l58fnrBm/jKYnrcLN5xL89BdbK+XeOnbFtdVvwVndLm7pirrGgRAQgAAarqsDt1z5DuiX7AbvGgLVB0mlBUBFF2VtoEn+j
                                        XbYj0NDTp1KZVQN9xoLPplm8M+bg7aJ+pSKvXDdvK7LuUsCgewJnkIUHVjW/Rr14YVzY2625fZSDkMRL95TRw1vTl9mMaJ6JevAe+P2o6+F43DVe95TqQ3u39FKEosmoRKzLZyJ
                                        /qe2zi495jjjBSlK4EPaPPeqgBHs/0NzALIPWU4kcqEvheJvbyMF2YEPmD2UDReTIYEStKhdyQGQ6YESpK6FE1SHpMBYwIlYPiiicrCa6GHfiQR9sg4ttxuigwZykY0XW+cdA4ESpIci
                                        SYswYj5JcTQ16JJQ7AWPM7oE8pNNG0IMa8tlKRhL9Q3K2TPRxOAvWjqnog7G0wV6MUmctxCSYIb0eT9/Pis1bU8DPHs9KRxpVAXLhMtl+ch7cMxHfHkM08IP6b0Qwo+hixqQRdsKFoL
                                        IhlAkY1wJbEgEQrWa8YkfQbI4W40e9hUcxbqnC7WuUiyfA03nqG/MiFxKNYSjkp2E1Sjd5xsLHUn0TgKpO/n51p0AeuLXOBhtugsLrWpKOJeKDIadVf4gX0zOlII/wih
                                        LEFBGqqX8k92HdU6AL9P1hvOIU8gUcWKDt2kxuHbVGXh5/zcA8qNGc07BWxMkSHFnLDQqLLZ2Xbx+KsixcUycw+BWyGaA7W92BiMvkdQCXGGUVb7qL2F3PY2Co21BW+BrxPYaP63oKVol
                                        EVGMN4qDXA/ZvyMd+2OqlCl5pJui1nnKHm3QwsaDZHh0pRCuK33D/yVUTsXrF8U1ufo3g42DFSJpRDfQ7hq8I+cYG822UihFCacRm4osvyTMqhNpFBemsjDQfMMmNFpoctKHSqFUnhsT+E
                                        D6/jqDuWPezkQKfETra0dhQ/Y4+N0YZqy/k4CL0EVqbUlmrfaLU9rPYlWLtCMga4pD1ILtA5FJoEl1lPrPczAGvuT4HS+bfZzaKhDVU4kkVDraWwy2cM8bGe8XnujyRSTeBCZ
                                        AW5hG5+LCZdcAZPDs+sDG+9cTDjMqEHI4dn1gX1tXEQWNs3qqrycsEK2ApfwCb6HWtFB+V3g0BMXry32NguOkWLFVLlyePYNnQ9ZrFcfKzU87oqN77hQV9vD2kM
                                        O7Uo/W0s4OPxoik1RdLBiqs6YP3qNPx4UGz+0XW5HaYI+Htgwf3IDWGtvgyjk4A/DTAyu1uJyFY6ulmjH2idvaXPskmCHprmCLMQkpvS0djgw0ycrxYYU+E+Iq8bDWrceho/zp
                                        LF+vD14ZgSE+JAMRVhQWGEzL7YdmdKBNU9/yCEztu3dQJjqNkbXxHhdwEBlbl0cZfOlzu90ZGCwF0efgKw3sED/d2ZexnMyT6//YnkkQLNB7u7EqBjrTXzCdbCYz0gLfRFI808/7RQwf
                                        v5/CUnosAjIOUGMRk2k8ezAltt5RqKsIW+X8n1Wc8tT+HNmy2qO6Z4JoxDt4duX6bPVaq7pkUD1KgIoPL/uYcbjfmL6+DdByCGlsX18HUyLLG7JUmKN31+utNC3gMJOmcMzZslqvPfnQ
                                        tdBQHjGl5FxnzqkLZZ62/tZM1TPIaDIa4b0fpP3yiOVl5vkIzbwK74+5K9U7pyXIQHZ4EDiu4qFwsRCcmrWyD5U+bKAI/LWqEIcbsifmVgXnIBcioJKEo7IOOXqk8buqKGYQLeN+DiY8ztBH
                                        rqFwgotA3RH+FWV23vkKRHWX8HaI1eYtuEjrJw98pQIrF+b4EQFbcGDRCfEHlNZYGzmirO+dB62zQp7EmWRJSUWPkfSkL3ylpTfahvmj26CcYh4AQfzDRmgkrb/vh8xhzXmNgPWN3GsYi4jvM
                                        PJGClvBmsLFecp6IJ38Im7guQ+28wle8jr9DeHb/JQ3nAyjdCcthRbyF4s4yJ4IWZhGVjuM00DxUaT4ArZFMjaZxkkxSXijRLkeQIn1ZjsPjg+Fk0T5PkBXRqGm4i6Fgmuj81iiT75g
                                        VUe7WQo0u4lwmV7bfAt3DB6HAvgj86oTd6E+b1mAMROFTabyPRhrICbuJgsbs4R3WqjZ51okXYKGbgWsTrTC400C5xJyMBnhPxbQBFuNRUxRU5+0NXEmGFFvncdWn/sOYq
                                        CdXWqXF92IXCZvBRbYLGvdWMQmGX1Sdi/sXoxG6WT7oa7THLx3XWHg1zwapdMyQtiMwKy2GohRue0Q6Yk9hdwjth1wFbppk8mopBH9QYbOKhFm9E2eQhnWs57PDoAF9QN28l9f
                                        MpFhik+Y/rKsgGtRMZI76usz+EP9p42Z4ZjxIq1frjX6JihDm1w3/QuOfgf9lGZyQMHppVFs10co6bnQOqdwl0G5jbKvsm7rjGBWq+5TIIjitXABsNUfA2XNvRW1OcRIK4PhnX1twiNb
                                        wEtpYwABEmrhXudk7q+oZ8DoS0+GiJOItRS8MkitiI8YKi383PImOCxQcAIK4+qFczxCDPYb1WmDC+pyQKyMvXIG2n5JznpqKTvexEpbALnlnQcBJq5OE3WeRXAXi9P+2HaKky99ljbp
                                        iJ6ty4D2kBz/5ynwXG5XMbR9Lxx9UzrHXjo5Xynz8h3EgRQ0XRDlmXj1YUm84fB9ted0BSx9HEUIpDdXyQkyphdtMrubEAG0W+8gVnMAkWltPQCmir9ouGjFRhdw0FxbC6AuuzueukVb
                                        QV7dFm5qirruqZpui6rA/ce+b9rPu5n2I5/DKLL5RIFR9/5Kw7nP/zDP/zDP7SBU+VB9EdZVJm7Tk89ivZyVdU+cXdQsxju6PJ+pN6XvdMGnOPtICuA+vFnm+KYiwqjfq0r8uF+7M9OW
                                        l60HcjwGbqlaSqOW+7HDiVajcbsaTlDWb4Fomc9PWGPTgsDz1OnlpjNXNL4BxjSdgm3FoKGvpiOhJ5XJ75pWWfEhvwze0Geb6HQyqXe4/jA4/krQefV9i8L08g1kael0J5pg1h1
                                        Sjg7P70Gyubi4n9ZVR8fz6FaauJMyS890udZH8hO4E2x+z7QVfe6/Jo357F5CrETt3Im/t6jDigBkCxAt4T5AkCR4Sbin69oT3a6SvMuUSjEKW8E0LJKSBQ+AfWhcuLJepzlVVMrhuLQK
                                        LQpMxINWoIljULp5duBV6ZNRlLMlncwqJ75Q83z9ok3UdnQdmNT6YIEijo/L1lznsn9cQ0+uT7p5QgxgUQIqDux/+hkfbzNlaEbaz1Vqg7ne116hvClNGMPSnTWWGdw4mMnwYUJd7WWt7Jc
                                        oCxaMWvmVCARSnS2aNcc1QL0wWrSle/YkTuoPRqmMpHikhtgBpUKlXNdf1Q7VPcfY7BVmE2Nj3GHLOQqcRWr70dpbpUi1mh6KzD01nGB2cVoOPe+usfKaJ6QqNwq2X3QbFmga+1oDOaNJxd+6FA5xhR+anNxbzoyCRhh8wpWv80UMbCovBNesjdVl5CuIFSuLG+aKXTWrs3oqWwLPhJ2iRlcndDvtxq0Bw9NSlB8t+EFTFDZVc1JxVx1X6tLy/lsxqL2NgZ621F+lTcsfrPIqkTu9pO+oVIzHeBKmmJcE1UVdRmrr6or0qT9NEig1jmp9rbL8FdIz3/Nqd8VvUBL5m8TyPeP8n+26TbAd0B99V1WtaX3//YO1GfXgX77JBo7EkgvqrNy5gW9AuzcaSrrg8QPNTtxl5GoLyiUTYzzh5+Wh+h1HZAsmZXJK1atQWiV0CmbWJj+TOM1185TrqunaZYHiTeHTtxEv+TVJyoH3bewepqgQx9+Vh9k5XRX3BvyZNZ7x1v4BD24UOEUa4QDYXdmpW9HrP3xuzFSDIPaj9PpfAdeIF2xuGzykUqGF11kYQr6WBM2W0hs2EF4dULXi2UHbSoL2ibaHce8p4AlI4roTizpNXbIgA28YJDZKQtGiiAXv+GOxEBKjeRZnSEaO7XmrL5gSWLYxFcHYf5Le03cM9Ug+zUn7BYoljvHZClXKD/opHIXH02ycViIohRqzm9CYZF5phswYjMvkISyU8fRXBsgm7Tg006HkZGcDZykddYnSP0Jy0+YL5Q80eRsVq+piDe1AaFLGPU1WuJdlj+jhnQyNlTEkAs8QegzzvKev5B2a4/ppyMtViPH3zqgrFjZDJT6whp7vEEelUKgYaliM2UCL+hFCtesP2KmucWF9vWGCce9M74iD5QGULGUhgmSq2hRpEX6CSK2XA4tXlSOY6bMOlkFM7Q1MYKVqq8d/Id0lHpxRuzPydOMwUdlQrgD6R/XNQOwzVByv59YajQp0m0KSiSCJNhoh6y5+Aslvf7MZRlJS9IzosJJTOvSrQ2Xb1seb3vjcVIekFNuknNQAC1hBNSkt44opb5Up7B0gJqclsB8LwGVRKnaceDhaImiC2HBi0JJTfSnSRrS0txE3ymmaLBDyUTc81opQ6KHM4XlNLYw5SEnEEqBPpfbUg8SExPCXqnPzgmpV5zfDhI6voX81srcxcdl1N4Rix1HAh8W4jcplAYp6/bSqmZrxYvJvFCicM5ztYc1XwrrORtOYgIDzAsLcl1NerLPvPvNC/kI+hRfp1CCMOtZW7ZOhqiL0qgtzus9lzRTr4x1MrmJ33S571P4kIN/0EldL5g7FMoQQqGkwKdNHGi8T+gTYih8mEzb0aZFwlybpYoUcpYWKWD9hNxuKPHSj8njvw0lvbRxTmffUSr+aJiX23+UQogc/KViUc6cY+7VFwtCusSEVRS/HyB1+F/x8JiKArF2k0lCVE8AXWK5g89fHf4SAC2j3gd/x0HV5tSSAWc1/P0cFarnqoqcycYs9qz6TQBQN7ef6hLX8X3/LTWcNcLFNaYd0P8BRDnhHVsYDs8AAAAASUVORK5CYII=" style={{width: 200, height: 228}} className="img-circle" />
                                    </div> 
                                    <div className="col-md-12 hidden-xs-down">
                                        <Media query="(max-width: 500px)">
                                            {matches => matches ? (
                                                <p></p>
                                            ) : (
                                                <table className="table table-user-information">
                                                    <tbody>
                                                    <tr>
                                                        <td>Name  :</td>
                                                        <td>Eranga Dilkjd</td>
                                                    </tr>
                                                    <tr>
                                                        <td>UserN  ame:</td>
                                                        <td> </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Email</td>
                                                        <td><a href="">er angadulshan10@gmail.conmkgj</a></td>
                                                    </tr>

                                                    </tbody>
                                                </table>
                                            )}
                                        </Media>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*/span*/}
                </div>
                {/*/.fluid-container*/}
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-3">
                                <Link to='/admin/reports'>
                                    <div className="img-circle text-center" style={{backgroundColor:'#5bc0de',height:200}}>
                                    </div>
                                    <h4 className="text-center">Reported Incidents</h4>
                                </Link>
                            </div>
                            <div className="col-md-3">
                                <Link to='/admin/reports'>
                                    <div className="img-circle text-center" style={{backgroundColor:'#5bc0de',height:200}}>
                                    </div>
                                    <h4 className="text-center">Buyer Details</h4>
                                </Link>
                            </div>
                            <div className="col-md-3">
                                <Link to='/admin/reports'>
                                    <div className="img-circle text-center" style={{backgroundColor:'#5bc0de',height:200}}>
                                    </div>
                                    <h4 className="text-center">Seller Details</h4>
                                </Link>
                            </div>
                            <div className="col-md-3">
                                <Link to='/admin/reports'>
                                    <div className="img-circle text-center" style={{backgroundColor:'#5bc0de',height:200}}>
                                    </div>
                                    <h4 className="text-center">Statistics</h4>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default AdminDashBoard;