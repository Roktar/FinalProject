package bitcamp.java106.pms.web.json;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.MatrixVariable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import bitcamp.java106.pms.domain.TestBase;
import bitcamp.java106.pms.service.TestService;

@Controller
@RequestMapping("/testb")
public class TestBaseController {
    
    TestService testService;
    
    public TestBaseController(TestService testService) {
        this.testService = testService;
    }
    
    
    @RequestMapping("add")
    @ResponseStatus(HttpStatus.CREATED)
    public void insert(@RequestBody String tb) { 
        
        String[] seperateParameter = tb.split("&");
        Map<String, String> seperateKeyValue = new HashMap<>();

        try {
            
            for(String param : seperateParameter) {
                String[] keyVal = param.split("=");
                keyVal[0] = URLDecoder.decode(keyVal[0], "UTF-8");
                keyVal[1] = URLDecoder.decode(keyVal[1], "UTF-8");
                
                if(keyVal[0].startsWith("schedules")) 
                    keyVal[0] = keyVal[0].substring(12) + keyVal[0].substring(10, 11);
                
                seperateKeyValue.put(keyVal[0], keyVal[1]);
            }
            
        } catch (UnsupportedEncodingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        
        System.out.println(seperateKeyValue);
        testService.insert(seperateKeyValue);
    }
    
    @RequestMapping("delete")
    public void delete(int no) throws Exception {
        System.out.println(no);
        testService.delete(no);
    }
    
    @RequestMapping(value="list{page}", produces=MediaType.APPLICATION_JSON_VALUE)
    public List<TestBase> list(@PathVariable String page, @MatrixVariable(defaultValue="1") int pageNo, @MatrixVariable(defaultValue="3") int pageSize) {      
        System.out.println("list 메소드 호출");
        return testService.list(pageNo, pageSize);
    }
    
    @RequestMapping(value="listdetail{page}", produces=MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<TestBase> listWithSchedules(@PathVariable String page, @MatrixVariable(defaultValue="1") int pageNo, @MatrixVariable(defaultValue="3") int pageSize) {      
        System.out.println("listWithSchedules 메소드 호출");
        return testService.getSchedules(pageNo, pageSize);
    }
}

//ver 49 - 요청 핸들러의 파라미터 값 자동으로 주입받기
//ver 48 - CRUD 기능을 한 클래스에 합치기
//ver 47 - 애노테이션을 적용하여 요청 핸들러 다루기
//ver 46 - 페이지 컨트롤러를 POJO를 변경
//ver 45 - 프론트 컨트롤러 적용
//ver 42 - JSP 적용
//ver 40 - 필터 적용
//ver 39 - forward 적용
//ver 38 - redirect 적용
//ver 37 - BoardAddController 클래스를 서블릿으로 변경
//         출력 결과를 HTML로 변경
//         자동 Refresh 태그 추가
//ver 31 - JDBC API가 적용된 DAO 사용
//ver 28 - 네트워크 버전으로 변경
//ver 26 - BoardController에서 add() 메서드를 추출하여 클래스로 정의. 






